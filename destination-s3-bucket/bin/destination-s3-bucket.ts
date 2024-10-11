#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { DestinationS3BucketStack } from "../lib/destination-s3-bucket-stack";
import { ParameterNames } from "../properties/parameter-names";

const app = new cdk.App();
new DestinationS3BucketStack(app, "DestinationS3BucketStack", {
  env: {
    account: ParameterNames.ACCOUNT,
    region: ParameterNames.REGION,
  },
});
