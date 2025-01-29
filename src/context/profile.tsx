import { createContext, ReactNode, useState } from "react";
import { MyErrorResponse } from "../proptypes/ResponseProp";
import { ProfileProp, ProfileResponseProp } from "../proptypes/ProfileProp";
import {
  createProfile,
  getProfile,
  putProfilePicture,
} from "../services/apiCaller/profileClient";

interface ProfileContextType {
  profile: ProfileProp;
  getProfilePicture: () => URL | null;
  setUsernameEmail: (username: string, email: string) => void;
  updateProfile: (profile: ProfileProp) => void;
  updateProfilePicture: (
    image: Blob
  ) => Promise<ProfileResponseProp | MyErrorResponse>;
  getProfileOnStartup: (
    id: number
  ) => Promise<ProfileResponseProp | MyErrorResponse>;
  getCurrentProfile: () => ProfileProp;
  registerProfile: (
    profile: ProfileProp
  ) => Promise<ProfileResponseProp | MyErrorResponse>;
}

const ProfileContext = createContext<ProfileContextType>({
  profile: {
    id: 0,
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    dob: "",
    phoneNumber: "",
    profilePicture: null,
  },
  getProfilePicture: () => null,
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
  getCurrentProfile: () => {
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
  getProfileOnStartup: () => {
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

  const getProfileOnStartup = async (id: number) => {
    const res = await getProfile(id);
    setProfile(res.data);
    console.log("Inside getProfileOnStartup");
    console.log(res.data);
    return {
      status: res.data.status,
      status_code: res.status,
      data: res.data,
    };
  };

  const getCurrentProfile = () => {
    return profile;
  };

  const getProfilePicture = (): URL | null => {
      if (typeof profile.profilePicture === "string") {
        const byteCharacters = atob(profile.profilePicture);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        profile.profilePicture = new Blob([byteArray], { type: "image/jpeg" });
      }
      return profile.profilePicture instanceof Blob
        ? new URL(URL.createObjectURL(profile.profilePicture))
        : null;
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
    registerProfile,
    getProfileOnStartup,
    getCurrentProfile,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export { ProfileProvider, ProfileContext };
