export class ParameterNames {
  public static readonly PROJECT_NAME = "destination-bucket-policy";
  // 👇 Add your destination account number 👇
  public static readonly ACCOUNT = "";
  // 👇 Add your destination region 👇
  public static readonly REGION = "us-west-2";
  // 👇 Add your source account number 👇
  public static readonly ORIGIN_ACCOUNT = "";
  // 👇 Add your source role arn  👇
  public static readonly SOURCE_ROLE_ARN = `arn:aws:iam::${ParameterNames.ORIGIN_ACCOUNT}:role/source-bucket-ReplicationRole`;
  // 👇 Add destination Bucket name   👇
  public static readonly DESTINATION_BUCKET_NAME = "";
}
