import { signOut } from "firebase/auth";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { firebaseAuth } from "../utils/FirebaseConfig";
import { useAppDispatch } from "../app/hooks";
import { setToast, setUserStatus } from "../app/slices/AppSlice";
function Footer() {
  const dispatch = useAppDispatch();
  const handLogout = () => {
    signOut(firebaseAuth);
    dispatch(setUserStatus(undefined));
    dispatch(setToast("Logged out successfully from Firebase."));
  };
  return (
    <footer>
      <div className="block"></div>
      <div className="data"></div>
      <div className="block">
        <MdOutlinePowerSettingsNew onClick={handLogout} />
      </div>
    </footer>
  );
}

export default Footer;
