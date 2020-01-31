import { firestore } from "../firebase";
import { auth } from "../firebase";

export async function createUserProfile(user) {
  const userRef = firestore.collection("users").doc(user.uid);
  const userDoc = await userRef.get();

  if (userDoc.exists) {
    const idTokenResult = await auth.currentUser.getIdTokenResult();

    return {
      ...userDoc.data(),
      ...(idTokenResult.claims.admin && { admin: true })
    };
  }
}
