import * as cdk from "aws-cdk-lib";
import {
  Role,
  ServicePrincipal,
  PolicyStatement,
  Effect,
} from "aws-cdk-lib/aws-iam";
import { Bucket, BlockPublicAccess, CfnBucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { ParameterNames } from "../properties/parameter-names";

export class OriginS3BucketStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    const sourceBucket = new Bucket(
      this,
      `${ParameterNames.PROJECT_NAME}-bucket-id`,
      {
        bucketName: `${ParameterNames.PROJECT_NAME}-${props.env?.account}`,
        blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
        // 👇 Source and destination buckets should have Versioning enabled
        versioned: true,
      }
    );

    const replicationRoleSource = new Role(
      this,
      `${ParameterNames.PROJECT_NAME}-ReplicationRole-id`,
      {
        roleName: `${ParameterNames.PROJECT_NAME}-ReplicationRole`,
        assumedBy: new ServicePrincipal("s3.amazonaws.com"),
      }
    );

    replicationRoleSource.addToPolicy(
      new PolicyStatement({
        actions: [
          "s3:ListBucket",
          "s3:GetReplicationConfiguration",
          "s3:GetObjectVersionForReplication",
          "s3:GetObjectVersionAcl",
          "s3:GetObjectVersionTagging",
          "s3:GetObjectRetention",
          "s3:GetObjectLegalHold",
        ],
        effect: Effect.ALLOW,
        resources: [
          sourceBucket.bucketArn,
          `${sourceBucket.bucketArn}/*`,
          `${ParameterNames.DESTINATION_BUCKET_ARN}`,
          `${ParameterNames.DESTINATION_BUCKET_ARN}/*`,
        ],
      })
    );

    replicationRoleSource.addToPolicy(
      new PolicyStatement({
        actions: [
          "s3:ReplicateObject",
          "s3:ReplicateDelete",
          "s3:ReplicateTags",
          "s3:ObjectOwnerOverrideToBucketOwner",
        ],
        effect: Effect.ALLOW,
        resources: [
          `${sourceBucket.bucketArn}/*`,
          `${ParameterNames.DESTINATION_BUCKET_ARN}/*`,
        ],
      })
    );

    // 👇 Create a replication rule
    const cfnBucket = sourceBucket.node.defaultChild as CfnBucket;
    cfnBucket.replicationConfiguration;

    cfnBucket.replicationConfiguration = {
      role: replicationRoleSource.roleArn,
      rules: [
        {
          id: "replication-rule",
          priority: 0,
          filter: {
            prefix: "", // 👈 add a prefix if you want to replicate specific objects. Leave blank to replicate all
          },
          deleteMarkerReplication: {
            status: "Enabled",
          },
          destination: {
            account: ParameterNames.DESTINATION_ACCOUNT,
            bucket: ParameterNames.DESTINATION_BUCKET_ARN,
            accessControlTranslation: {
              owner: "Destination", // 👈 Destination or BucketOwner
            },
          },
          status: "Enabled",
        },
      ],
    };
  }
}
