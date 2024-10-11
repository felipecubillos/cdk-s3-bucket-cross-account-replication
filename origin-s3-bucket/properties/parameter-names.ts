export class ParameterNames {
  // 👇 Add your destination account number 👇
  public static readonly ACCOUNT = "";
  // 👇 Add your destination region 👇
  public static readonly REGION = "us-west-2";
  public static readonly PROJECT_NAME = "source-bucket";
  // 👇 Add your destination account number 👇
  public static readonly DESTINATION_ACCOUNT = "";
  // 👇 Add your destination bucket name 👇
  public static readonly DESTINATION_BUCKET_ARN = `arn:aws:s3:::destination-bucket-${this.DESTINATION_ACCOUNT}`;
}
