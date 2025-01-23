import { useContext } from "react";
import { ProfileContext } from "../context/profile";

const useProfile = () => {
  return useContext(ProfileContext);
};

export default useProfile;
