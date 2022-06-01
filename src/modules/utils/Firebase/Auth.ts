import firebase, { auth } from "modules/utils/Firebase";
import { eventChannel, EventChannel } from "redux-saga";
import { Profile } from "modules/utils/Firebase/Api";

class FireBaseAuth {
  authChannel!: EventChannel<any>;

  signInUser = (email: string, password: string, keepSignedIn: boolean) => {
    return new Promise((resolve, reject) => {
      const persistenceScheme = keepSignedIn ? "LOCAL" : "SESSION";
      auth
        .setPersistence(firebase.auth.Auth.Persistence[persistenceScheme])
        .then(() =>
          auth
            .signInWithEmailAndPassword(email, password)
            .then((response: any) => {
              resolve(response);
            })
            .catch((err: any) => {
              console.error(String(err));
              reject(err);
            })
        )
        .catch((err) => {
          console.error(String(err));
          reject(err);
        });
    });
  };

  fetchCurrentUser = () => {
    return auth.currentUser;
  };

  fetchCurrentUserToken = () => {
    return new Promise((resolve) =>
      auth.currentUser?.getIdToken().then(resolve)
    );
  };

  getAuthChannel = () => {
    this.authChannel = eventChannel((emit) => {
      return auth.onIdTokenChanged((user: firebase.User | null) => {
        if (!user) return emit({ error: "No user" });
        return emit({ user });
      });
    });
    return this.authChannel;
  };

  resetPassword = (email: string) => {
    return new Promise((resolve, reject) => {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          console.error(String(error));
          reject(error);
        });
    });
  };

  logOutUser = () => {
    return new Promise((resolve, reject) => {
      auth
        .signOut()
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          console.error(String(err));
          reject(err);
        });
    });
  };

  updatePassword = (newPassword: string) => {
    return new Promise((resolve, reject) => {
      const user = auth.currentUser;
      user &&
        user
          .updatePassword(newPassword)
          .then(() => {
            resolve(true);
          })
          .catch((error) => {
            // An error happened.
            console.error(String(error));
            reject(error.message);
          });
    });
  };

  updateProfile = async (payload: any) => {
    return new Promise((resolve, reject) => {
      const userRef = Profile.profile(payload.uid);
      userRef
        .update({
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          title: payload.title,
          facebook: payload.facebook,
          twitter: payload.twitter,
          instagram: payload.instagram,
          linkedin: payload.linkedin,
          profilePath: payload.profilePath
        })
        .then(() => {
          resolve(true);
        })
        .catch(function (error) {
          console.error(String(error));
          reject(error);
        });
    });
  };

  checkExistingRoles = async (email: any) => {
    try {
      const rolesCheckByEmail = firebase
        .functions()
        .httpsCallable("isAdminUserValid");
      const response = await rolesCheckByEmail({
        email: email
      });
      return response;
    } catch (e) {
      console.error(String(e));
      return e;
    }
  };
}

export default FireBaseAuth;
