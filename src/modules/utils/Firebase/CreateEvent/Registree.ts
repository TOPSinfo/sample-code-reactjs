import firebase from "modules/utils/Firebase";

export const csvImportDataApi = async (obj: any) => {
  try {
    const AddCsvData = firebase.functions().httpsCallable("adminImportCsv");
    const response = await AddCsvData(obj);
    return response;
  } catch (e) {
    console.error(String(e));
    return e;
  }
};

export const clearChatApi = async (obj: any) => {
  try {
    const clearChatResp = firebase.functions().httpsCallable("clearChat");
    const response = await clearChatResp(obj);
    return response;
  } catch (e) {
    console.error(String(e));
    return e;
  }
};
