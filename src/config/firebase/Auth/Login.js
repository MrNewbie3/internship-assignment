import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, database, onRefDB, provider } from "../Instance/Firebase";
import { onValue, push, ref, remove, set } from "firebase/database";
import { getDataFromApi } from "../../Axios/AxiosGet";
export const loginAction = async () => {
  await signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      localStorage.setItem("isSignedIn", JSON.stringify(result));
      console.log(Date.now());
    })
    .catch((error) => {
      // Handle Errors here.
      console.log(error);

      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

export const logOut = async () => {
  await auth
    .signOut()
    .then(() => {
      console.log("success");
      localStorage.removeItem("isSignedIn");
    })
    .catch((error) => {
      // An error happened.
    });
};
