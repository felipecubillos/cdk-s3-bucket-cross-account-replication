import * as cdk from "aws-cdk-lib";
import { OriginS3BucketStack } from "../lib/origin-s3-bucket-stack";
import { ParameterNames } from "../properties/parameter-names";

const app = new cdk.App();
new OriginS3BucketStack(app, "OriginS3BucketStack", {
  env: {
    account: ParameterNames.ACCOUNT,
    region: ParameterNames.REGION,
  },
});
