import { Routing } from "modules/utils/Firebase/Api";
import firebase from "modules/utils/Firebase";

export const checkDiscoveryNameExist = async (
  organizationId: string,
  discoveryName: string
) => {
  try {
    const orgRoutingRef = Routing.reference();
    const querySnapshot = await orgRoutingRef
      .where("friendlyUrl", "==", discoveryName)
      .get();
    let data: any = null;
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc: firebase.firestore.DocumentSnapshot) => {
        data = { ...doc.data(), id: doc.id };
      });
      return data?.organizationId
        ? data?.organizationId !== organizationId
        : !!data;
    }
    return false;
  } catch (e) {
    console.error(String(e));
    return [];
  }
};

export const getDiscoveryFriendlyName = async (organizationId: string) => {
  const orgRoutingRef = Routing.reference();
  const friendlyRoutingRef = orgRoutingRef
    .where("organizationId", "==", organizationId)
    .where("type", "==", "discovery");
  const data = await friendlyRoutingRef.get();
  const orgdata: any = [];

  data.forEach((x) => {
    orgdata.push({
      ...x.data(),
      id: x.id
    });
  });
  return orgdata.length > 0 ? orgdata[0] : null;
};

export const saveDiscoveryFriendlyName = async (
  organizationId: string,
  discoveryName: string
) => {
  try {
    const orgRoutingRef = Routing.reference();
    const friendlyRoutingRef = orgRoutingRef.doc();
    let dataId = friendlyRoutingRef.id;
    const querySnapshot = await orgRoutingRef
      .where("organizationId", "==", organizationId)
      .where("type", "==", "discovery")
      .get();

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc: firebase.firestore.DocumentSnapshot) => {
        dataId = doc.id;
      });
    }
    await orgRoutingRef.doc(dataId).set(
      {
        id: dataId,
        friendlyUrl: discoveryName,
        type: "discovery",
        organizationId
      },
      { merge: true }
    );
    return true;
  } catch (e) {
    console.error(String(e));
    return false;
  }
};

export const deleteDiscoveryName = async (organizationId: string) => {
  try {
    const orgRoutingRef = Routing.reference();
    const querySnapshot = await orgRoutingRef
      .where("organizationId", "==", organizationId)
      .where("type", "==", "discovery")
      .get();
    querySnapshot.forEach(async (doc: firebase.firestore.DocumentSnapshot) => {
      const data = doc.data();
      if (data) await orgRoutingRef.doc(data.friendlyUrl).delete();
    });
    return true;
  } catch (e) {
    console.error(String(e));
    return [];
  }
};
