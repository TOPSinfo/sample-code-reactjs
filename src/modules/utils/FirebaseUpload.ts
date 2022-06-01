import firebase, { storage } from "modules/utils/Firebase";
const AVATAR_BUCKET: string = process.env.REACT_APP_tops_AVATAR_BUCKET || "";
const ASSETS_BUCKET: string = process.env.REACT_APP_tops_ASSETS_BUCKET || "";

const UploadFile = (
  filePath: string,
  file: File,
  fileKey: string,
  storePath: string
) => {
  // const uploadTask = storageRef.child(filePath + file.name).put(file);
  console.log("filefile", file);
  const lastIndexOfDot = file.name.lastIndexOf(".");
  const name = file.name;
  const nameLength = file.name.length;
  const fileName = `${name.slice(0, lastIndexOfDot)}_${Date.now()}${name.slice(
    lastIndexOfDot,
    nameLength
  )}`;
  console.log("new file name will be ", fileName);
  const uploadTask = storage
    .refFromURL(`${ASSETS_BUCKET}${filePath + fileName}`)
    .put(file);
  return new Promise((resolve, reject) => {
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
        }
        // resolve(progress);
      },
      (error: any) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

            // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
        reject(error);
      },
      () => {
        const path = filePath.split("/Event")[1];
        console.log("pathpath", path);
        resolve({
          key: fileKey,
          fileUrl: `${storePath || path}${fileName}`
        });
      }
    );
  });
};
export const UploadAvatar = async (fileName: string, file: File) => {
  const uploadTask = await storage
    .refFromURL(`${AVATAR_BUCKET}/${fileName}`)
    .put(file);
  const downloadURL = await uploadTask.ref.getDownloadURL();
  return downloadURL;
};
export default UploadFile;
