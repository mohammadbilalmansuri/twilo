import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsVerified,
  selectUserData,
} from "../store/selectors";

const useAuthState = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isVerified = useSelector(selectIsVerified);
  const userData = useSelector(selectUserData);

  return {
    isLoggedIn,
    userData,
    isVerified,
  };
};

export default useAuthState;
