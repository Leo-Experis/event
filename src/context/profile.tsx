import { createContext, ReactNode, useState } from "react";
import { MyErrorResponse } from "../proptypes/ResponseProp";
import { ProfileProp, ProfileResponseProp } from "../proptypes/ProfileProp";
import {
  createProfile,
  putProfilePicture,
} from "../services/apiCaller/profileClient";

interface ProfileContextType {
  profile: ProfileProp | {};
  getProfilePicture: () => Blob | null;
  setUsernameEmail: (username: string, email: string) => void;
  updateProfile: (profile: ProfileProp) => void;
  updateProfilePicture: (
    image: Blob
  ) => Promise<ProfileResponseProp | MyErrorResponse>;
  getProfile: () => ProfileProp;
  registerProfile: (
    profile: ProfileProp
  ) => Promise<ProfileResponseProp | MyErrorResponse>;
}

const ProfileContext = createContext<ProfileContextType>({
  profile: {},
  getProfilePicture: () => new Blob(),
  setUsernameEmail: () => {},
  updateProfile: () => {},
  updateProfilePicture: async () => {
    return Promise.resolve<ProfileResponseProp | MyErrorResponse>({
      status_code: 500,
      data: {
        id: 0,
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        dob: "",
        phoneNumber: "",
        profilePicture: null,
      },
    });
  },
  getProfile: () => {
    return {
      id: 0,
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      dob: "",
      phoneNumber: "",
      profilePicture: null,
    };
  },
  registerProfile: async () => {
    return Promise.resolve<ProfileResponseProp | MyErrorResponse>({
      status_code: 500,
      data: {
        id: 0,
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        dob: "",
        phoneNumber: "",
        profilePicture: null,
      },
    });
  },
});

const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<ProfileProp>({
    id: 0,
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    dob: "",
    phoneNumber: "",
    profilePicture: null,
  });

  const setUsernameEmail = (username: string, email: string) => {
    setProfile({
      ...profile,
      ["email"]: email,
      ["username"]: username,
    });
  };

  const updateProfile = async (profile: ProfileProp) => {
    setProfile(profile);
  };

  const updateProfilePicture = async (image: Blob) => {
    const res = await putProfilePicture(profile.id, image);
    console.log(res);
    setProfile(res.data);
    return {
      status: res.data.status,
      status_code: res.status,
      data: res.data,
    };
  };

  const getProfile = () => {
    return profile;
  };

  const getProfilePicture = () => {
    console.log("Inside profile picture: ");
    console.log(profile);
    return profile.profilePicture ? profile.profilePicture : null;
  };

  const registerProfile = async (_profile: ProfileProp) => {
    const res = await createProfile(_profile);
    console.log(res);

    setProfile(res.data);

    return {
      status: res.data.status,
      status_code: res.status,
      data: res.data,
    };
  };

  const value = {
    profile,
    getProfilePicture,
    setUsernameEmail,
    updateProfile,
    updateProfilePicture,
    getProfile,
    registerProfile,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export { ProfileProvider, ProfileContext };
