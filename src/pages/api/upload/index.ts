import S3 from "aws-sdk/clients/s3";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const s3 = new S3({
    signatureVersion: "v4",
    region: process.env.REGION,
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  });

  const preSignedUrl = s3.getSignedUrl("putObject", {
    Bucket: process.env.BUCKET_NAME,
    Key: req.query.file,
    ContentType: req.query.fileType,
    Expires: 5 * 60,
  });
  res.status(200).json({
    url: preSignedUrl,
  });
}
