# AWS S3 Bucket cross account replication

A CDK project that creates an S3 bucket in two different accounts and sets up a replication rule to transfer objects from one bucket to the other.

![Architecture](/architecture.png "AWS Architecture")

## Deployment

To deploy this project follow this steps :

1. Deploy the destination bucket project.
   \*\*Remember to update the ParameterNames.ts file with your account information.

```bash
cd destination-s3-bucket/
npm i
npx aws-cdk deploy
```

2. Deploy the origin bucket project. This project will create the origin bucket, the replication role, and the replication rule to transfer objects to the destination bucket.
   \*\*Remember to update the ParameterNames.ts file with your account information.

```bash
cd origin-s3-bucket/
npm i
npx aws-cdk deploy
```

3. Deploy the destination-bucket-replication-policy project. This project will update the destination bucket with a policy that trust the replication role created in the step 2.

```bash
cd destination-bucket-replication-policy/
npm i
npx
```
