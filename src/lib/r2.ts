import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

function getClient() {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error(
      "R2 is not configured — set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY in .env",
    );
  }

  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });
}

// Uploads an image to the R2 bucket and returns its public URL.
export async function uploadImageToR2(file: File): Promise<string> {
  const bucket = process.env.R2_BUCKET_NAME;
  const publicUrl = process.env.R2_PUBLIC_URL;

  if (!bucket) {
    throw new Error("R2_BUCKET_NAME is not set in .env");
  }
  if (!publicUrl) {
    throw new Error(
      "R2_PUBLIC_URL is not set in .env — enable the bucket's Public Development URL (or custom domain) and add it to .env",
    );
  }

  const client = getClient();
  const extension = file.name.split(".").pop() || "jpg";
  const key = `${crypto.randomUUID()}.${extension}`;
  const bytes = new Uint8Array(await file.arrayBuffer());

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: bytes,
      ContentType: file.type || "application/octet-stream",
    }),
  );

  return `${publicUrl.replace(/\/$/, "")}/${key}`;
}
