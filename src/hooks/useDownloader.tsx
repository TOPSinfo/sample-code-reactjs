import S3 from "aws-sdk/clients/s3";
import { isEmpty } from "lodash";
import moment from "moment-timezone";

const credentials = {
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
};

const s3 = new S3({
  apiVersion: "2006-03-01",
  region: process.env.REACT_APP_MEDIA_CAPTURE_BUCKET_REGION,
  credentials
});
export default function useDownloader() {
  const getAllFilesInBucket = async (
    meetingId: string,
    roomTitle: string,
    updatedAt: any
  ) => {
    function downloadBlob(url: string, name: string) {
      const link = document.createElement("a");
      link.href = url;
      link.download = name;
      // Append link to the body
      document.body.appendChild(link);

      link.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window
        })
      );
      //   // Remove link from body
      document.body.removeChild(link);
    }

    const myKey = `captures/${meetingId}/processed/processedAudio.mp4`;
    const signedUrlExpireSeconds = 60 * 1; // your expiry time in seconds.
    const fileName =
      roomTitle.split(" ").join("-") +
      "_" +
      moment(updatedAt?.seconds * 1000).format("YYYY-MM-DDTHH:mm");
    const url = await s3.getSignedUrlPromise("getObject", {
      Bucket: process.env.REACT_APP_MEDIA_CAPTURE_BUCKET,
      Key: myKey,
      Expires: signedUrlExpireSeconds,
      ResponseContentDisposition:
        'attachment; filename ="' + `${fileName}.mp4` + '"'
    });

    downloadBlob(url, `${meetingId}.mp4`);
  };

  const downloadFileService = async (data: any) => {
    if (data.type === "Recording") {
      await getAllFilesInBucket(data.meetingId, data.title, data.updatedAt);
    } else {
      if (!isEmpty(data.url)) {
        window.open(data.url, "_blank");
      }
    }
  };

  return {
    downloadFileService
  };
}
