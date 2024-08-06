import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth, firebaseDB, userRef } from "../utils/FirebaseConfig";
import { where, query, getDocs, addDoc, collection } from "firebase/firestore";
import { useAppDispatch } from "../app/hooks";
import { setUserStatus } from "../app/slices/AppSlice";

function Login() {
  const dispatch = useAppDispatch();
  const handleClick = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { email, uid },
    } = await signInWithPopup(firebaseAuth, provider);

    if (email) {
      const firestoreQuery = query(userRef, where("uid", "==", uid));
      const fetchUser = await getDocs(firestoreQuery);
      if (fetchUser.docs.length === 0) {
        await addDoc(userRef, { uid, email });
      }
      dispatch(setUserStatus({ email }));
    }
  };
  return (
    <div className="login">
      <button className="login-btn" onClick={handleClick}>
        <FcGoogle />
        Login with Google
      </button>
    </div>
  );
}

export default Login;
