import os
import boto3

# === CONFIG ===
bucket_name = 'aquarium-fish-images'  # <-- Change this to your actual S3 bucket name
local_base_dir = '../fish-images'        # relative to your project root
s3_base_path = 'fish-images'          # path prefix in S3

# === INIT S3 CLIENT ===
s3 = boto3.client('s3')

# === RECURSIVELY UPLOAD ===
for root, dirs, files in os.walk(local_base_dir):
    for file in files:
        if file.lower().endswith(('.jpg', '.jpeg', '.png')):
            local_path = os.path.join(root, file)
            relative_path = os.path.relpath(local_path, local_base_dir)
            s3_path = os.path.join(s3_base_path, relative_path)

            print(f"Uploading {local_path} to s3://{bucket_name}/{s3_path}")
            s3.upload_file(local_path, bucket_name, s3_path)
