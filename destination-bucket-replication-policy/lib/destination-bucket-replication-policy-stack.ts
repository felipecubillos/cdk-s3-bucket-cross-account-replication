import * as cdk from "aws-cdk-lib";
import { PolicyStatement, Effect, ArnPrincipal } from "aws-cdk-lib/aws-iam";
import { Bucket, BucketPolicy } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { ParameterNames } from "../properties/parameter-names";

export class DestinationBucketReplicationPolicyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 👇 Get the destination bucket previoisly created
    const destinationBucket = Bucket.fromBucketName(
      this,
      "destination-bucket-id",
      ParameterNames.DESTINATION_BUCKET_NAME
    );

    // 👇 Create a new bucket policy for your destination bucket
    const bucketPolicy = new BucketPolicy(this, "bucket-policy-id", {
      bucket: destinationBucket, // 👈 Pass the destination bucket
    });

    // 👇 Add a statement to the bucket
    bucketPolicy.document.addStatements(
      new PolicyStatement({
        effect: Effect.ALLOW,
        principals: [new ArnPrincipal(ParameterNames.SOURCE_ROLE_ARN)],
        actions: [
          "s3:GetBucketVersioning",
          "s3:PutBucketVersioning",
          "s3:List*",
        ],
        resources: [destinationBucket.bucketArn],
      })
    );

    bucketPolicy.document.addStatements(
      new PolicyStatement({
        effect: Effect.ALLOW,
        principals: [new ArnPrincipal(ParameterNames.SOURCE_ROLE_ARN)],
        actions: [
          "s3:ReplicateObject",
          "s3:ReplicateDelete",
          "s3:ObjectOwnerOverrideToBucketOwner",
        ],
        resources: [`${destinationBucket.bucketArn}/*`],
      })
    );

    bucketPolicy.document.addStatements(
      new PolicyStatement({
        effect: Effect.ALLOW,
        principals: [new ArnPrincipal(ParameterNames.SOURCE_ROLE_ARN)],
        actions: [
          "s3:GetBucketVersioning",
          "s3:PutBucketVersioning",
          "s3:List*",
        ],
        resources: [destinationBucket.bucketArn],
      })
    );
  }
}
