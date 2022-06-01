import { storage } from "modules/utils/Firebase";
const PDF_BUCKET: string = process.env.REACT_APP_tops_PDF_BUCKET || "";

export const getDocumentUrlFirebase = async () => {
  const gsReference = storage
    .refFromURL(`${PDF_BUCKET}`)
    .child("EMT_documentation.pdf");

  const downloadURL = await gsReference.getDownloadURL();

  return downloadURL;
};
export default getDocumentUrlFirebase;
