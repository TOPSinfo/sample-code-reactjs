import { Contracts } from "modules/utils/Firebase/Api";
import firebase, { fieldValue } from "modules/utils/Firebase";

export const fecthOrganizationsInContact = async (contractId: string) => {
  try {
    const contractRef = await Contracts.contractReference(contractId);
    const snapShot = await contractRef.get();
    if (snapShot.exists) {
      const organization = snapShot.data();
      const eventRef = await Contracts.reference();
      const eventSnapShot = await eventRef
        .where(
          firebase.firestore.FieldPath.documentId(),
          "in",
          organization?.organizationIds ?? []
        )
        .get();
      const data: any[] = [];
      eventSnapShot.docs.map((doc) => {
        const data1 = doc.data();
        data.push({ ...data1, id: doc.id });
        return data1;
      });

      return data ?? [];
    }
    return false;
  } catch (e) {
    console.error(String(e))
    throw new Error(String(e));
  }
};

export const createNewOrganizationInContract = async (
  contractId: string,
  orgName: string,
  userId: string
) => {
  try {
    const contractRef = await Contracts.contractReference(contractId);
    const eventRef = await Contracts.reference();
    const eventDoc = eventRef.doc();
    const obj = {
      id: eventDoc.id,
      contractId,
      name: orgName,
      createdAt: fieldValue.serverTimestamp(),
      updatedAt: fieldValue.serverTimestamp()
    };
    await eventDoc.set(obj, { merge: true });
    await contractRef.update({
      organizationIds: fieldValue.arrayUnion(eventDoc.id),
      updatedAt: fieldValue.serverTimestamp(),
      updatedBy: userId
    });
    return eventDoc.id;
  } catch (e) {
    console.error(String(e))
    return false;
  }
};
