import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsVerified,
  selectUser,
} from "../store/selectors";

const useAuthState = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isVerified = useSelector(selectIsVerified);
  const user = useSelector(selectUser);

  return { isLoggedIn, isVerified, user };
};

export default useAuthState;
