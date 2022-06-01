import { database } from "modules/utils/Firebase";

export default class LoungeAuth {
  checkLoungeUserRegisterd = async (
    orgId: string,
    evId: string,
    uid: string,
    loungeKey: string
  ) => {
    const databaseRef = database.ref(`Events/${orgId}/events/${evId}/lounges`);
    const user = await databaseRef.child(loungeKey).child(uid).once("value");
    return user.val();
  };

  registeruserInLounge = async (user: any, loungeKey: string) => {
    const databaseRef = database.ref(
      `Events/${user.organizationId}/events/${user.eventId}/lounges`
    );
    await databaseRef.child(loungeKey).child(user.uid).update(user);
  };
}
