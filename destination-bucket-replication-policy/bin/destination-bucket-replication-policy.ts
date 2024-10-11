import * as cdk from "aws-cdk-lib";
import { DestinationBucketReplicationPolicyStack } from "../lib/destination-bucket-replication-policy-stack";

const app = new cdk.App();
new DestinationBucketReplicationPolicyStack(
  app,
  "DestinationBucketReplicationPolicyStack",
  {
    env: {
      account: ParameterNames.ACCOUNT,
      region: ParameterNames.REGION,
    },
  }
);
