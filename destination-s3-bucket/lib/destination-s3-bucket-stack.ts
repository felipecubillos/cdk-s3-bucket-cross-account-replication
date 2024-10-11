import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { ParameterNames } from "../properties/parameter-names";
import { BlockPublicAccess, Bucket, ObjectOwnership } from "aws-cdk-lib/aws-s3";

export class DestinationS3BucketStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);
    const destinationBucket = new Bucket(
      this,
      `${ParameterNames.PROJECT_NAME}-bucket-id`,
      {
        bucketName: `${ParameterNames.PROJECT_NAME}-${props.env?.account}`,
        blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
        //👇 enforce bucket ownership to manipulate replicated objects
        objectOwnership: ObjectOwnership.BUCKET_OWNER_ENFORCED,
        // 👇 Source and destination buckets should have Versioning enabled
        versioned: true,
      }
    );
  }
}
