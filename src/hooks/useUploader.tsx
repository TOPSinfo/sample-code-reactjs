import { useState } from "react";
/* eslint-disable promise/param-names */
/* eslint-disable @typescript-eslint/no-unused-vars */
import queue from "async/queue";
import asyncify from "async/asyncify";
import S3 from "aws-sdk/clients/s3";
import { useDispatch, useSelector } from "react-redux";
import { addFileToDb } from "modules/actions";
import { getOrganizationId } from "modules/selectors";
import { Video } from "modules/utils/Firebase/Api";

const REGION = process.env.REACT_APP_S3_ASSET_BUCKET_REGION;
const credentials = {
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
};

const s3 = new S3({
  apiVersion: "2006-03-01",
  region: REGION,
  credentials
});
export default function useFileUploader() {
  const [uploadProgresss, setUploadProgress] = useState("0");
  const [uploadBtnState, controlUploadBtn] = useState(false);
  const organizationId = useSelector(getOrganizationId);

  const dispatch = useDispatch();
  const uploadSelectedFilesInQueue = queue(
    asyncify(async (file: any) => {
      const originalFile = file;
      // const currentTimeStamp = new Date().getTime().toString();
      const ref = Video.reference(organizationId).doc();
      const fileType = file.type.split("/")[1];
      const s3Name = `${ref.id}.${fileType}`;
      return await uploadFiles(s3Name, originalFile, fileType, ref.id, organizationId);
    }),
    2
  );

  const uploadFiles = async (
    s3Name: any,
    file: any,
    fileType: string,
    id: string,
    organizationId: string
  ) => {
    return new Promise((res, rej) => {
      const opts = { queueSize: 1, partSize: 10 * 1024 * 1024 };
      controlUploadBtn(true);
      s3.upload(
        {
          Bucket: process.env.REACT_APP_S3_ASSET_BUCKET,
          Key: organizationId + "/" + s3Name,
          Body: file,
          ContentType: file.type
        },
        opts
      )
        .on("httpUploadProgress", (event: any) => {
          const progress = Math.floor((event.loaded * 100) / event.total);
          if (progress < 100) {
            setUploadProgress(`${progress}%`);
          } else {
            setUploadProgress(`Complete!`);
          }
        })
        .send((err: any, data: any) => {
          if (err) {
            res(false);
          } else {
            const videoUrl = data.Location;
            const extRegex = /(.mp4|.jpeg|.jpg|.png|.jfif|.pjpeg|.pjp)/;
            let title =
              file.fileName.replace(/-|_/g, " ") ||
              data.key.replace(/-|_/g, " ");
            title = title.replace(extRegex, "").toLowerCase();
            const videoData = {
              title: title,
              url: videoUrl,
              fileName: title,
              type: fileType === "mp4" ? "Video" : "Image",
              id,
              duration: file.duration
            };
            dispatch(addFileToDb(videoData));
            // console.log("videoData", videoData);
            controlUploadBtn(false);
            res(data);
          }
        });
    });
  };

  return {
    uploadSelectedFilesInQueue,
    uploadProgresss,
    uploadBtnState
  };
}
