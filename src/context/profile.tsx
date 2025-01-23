import { createContext, ReactNode, useState } from "react";
import { ProfileProp, UserProp } from "../proptypes/UserProp";

interface ProfileContextType {
  username: string;
  email: string;
  profile: ProfileProp | {};
  setProfilePicture: (profilePicture: string) => void;
  getProfilePicture: () => string;
  setUsernameEmail: (user: UserProp) => void;
  updateProfile: (profile: any) => void;
  getProfile: () => void;
}

const ProfileContext = createContext<ProfileContextType>({
  username: "",
  email: "",
  profile: {},
  setProfilePicture: () => {},
  getProfilePicture: () => "",
  setUsernameEmail: () => {},
  updateProfile: () => {},
  getProfile: () => {},
});

const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<ProfileProp | {}>({});
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [profilePicture, _setProfilePicture] = useState<string>("");

  const setUsernameEmail = (user: UserProp) => {
    setUsername(user.username);
    setEmail(user.email);
  };

  const updateProfile = (profile: ProfileProp) => {
    setProfile(profile);
  };

  const getProfile = () => {
    // Fetch profile from the API
  };

  const getProfilePicture = () => {
    return profilePicture;
  };

  const setProfilePicture = (profilePicture: string) => {
    _setProfilePicture(profilePicture);
  };

  const value = {
    username,
    email,
    profile,
    setProfilePicture,
    getProfilePicture,
    setUsernameEmail,
    updateProfile,
    getProfile,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export { ProfileProvider, ProfileContext };
