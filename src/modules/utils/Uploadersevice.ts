/* eslint-disable promise/param-names */
/* eslint-disable @typescript-eslint/no-unused-vars */
import queue from "async/queue";
import asyncify from "async/asyncify";
import path from "path";
import S3 from "aws-sdk/clients/s3";

const REGION = process.env.REACT_APP_S3_ASSET_BUCKET_REGION;
const credentials = {
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
};

export const uploadSelectedFilesInQueue = queue(
  asyncify(async (file: any) => {
    const originalFile = file;
    const response = await uploadFiles(path.basename(file.name), originalFile);
    const data = await getFileUploadProgress(response, file);
    return data;
  }),
  2
);

export async function getS3Object() {
  return new Promise((res, rej) => {
    const s3 = new S3({
      apiVersion: "2006-03-01",
      region: REGION,
      credentials: credentials
    });

    res(s3);
  });
}

const uploadFiles = async (s3Name: any, file: any) => {
  return new Promise((res, rej) => {
    getS3Object().then(async (s3: any) => {
      const params = {
        Bucket: process.env.REACT_APP_S3_ASSET_BUCKET,
        Key: s3Name,
        Body: file
      };
      const opts = { queueSize: 1, partSize: 10 * 1024 * 1024 };
      const req = await s3.upload(params, opts);
      //   const req = s3.upload(params, opts);
      res(req);
    });
  });
};

const getFileUploadProgress = async (s3req: any, fileObj: any) => {
  return new Promise((res, rej) => {
    s3req.on("httpUploadProgress", async (evt: any) => {
      const filePercentage = (evt.loaded / evt.total) * 100;
      console.log("filePercentage", filePercentage);
    });

    s3req.send(async (err: any, data: any) => {
      if (err) {
        res(false);
      } else {
        res(data);
      }
    });
  });
};
