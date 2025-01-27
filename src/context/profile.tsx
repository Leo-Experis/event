import { createContext, ReactNode, useState } from "react";
import { MyErrorResponse } from "../proptypes/ResponseProp";
import { ProfileProp, ProfileResponseProp } from "../proptypes/ProfileProp";
import { createProfile } from "../services/apiCaller/profileClient";

interface ProfileContextType {
  profile: ProfileProp | {};
  getProfilePicture: () => string;
  setUsernameEmail: (username: string, email: string) => void;
  updateProfile: (profile: ProfileProp) => void;
  getProfile: () => ProfileProp;
  registerProfile: (profilePicture: string) => Promise<ProfileResponseProp | MyErrorResponse>;
}

const ProfileContext = createContext<ProfileContextType>({
  profile: {},
  getProfilePicture: () => "",
  setUsernameEmail: () => { },
  updateProfile: () => { },
  getProfile: () => {
    return {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      dob: "",
      phoneNumber: "",
      profilePicture: "",
    };
  },
  registerProfile: async () => {
    return Promise.resolve<ProfileResponseProp | MyErrorResponse>(
      {
        status_code: 500,
        data: {
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          dob: "",
          phoneNumber: "",
          profilePicture: "",
        }
      }
    );
  }
});

const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<ProfileProp>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    dob: "",
    phoneNumber: "",
    profilePicture: "",
  });

  const setUsernameEmail = (username: string, email: string) => {
    setProfile({
      ...profile,
      ['email']: email,
      ['username']: username
    });
  };

  const updateProfile = (profile: ProfileProp) => {
    console.log("updateProfile: ")
    console.log(profile)
    setProfile(profile);
  };

  const getProfile = () => {
    return profile;
  };

  const getProfilePicture = () => {
    return profile.profilePicture;
  };

  const registerProfile = async (profilePicture: string) => {
    await setProfile({ ...profile, ['profilePicture']: profilePicture })
    console.log("Inside register:")
    console.log(profile);
    const res = await createProfile(profile);
    console.log(res);

    return {
      status: res.data.status,
      status_code: res.status,
      data: res.data,
    }

  }

  const value = {
    profile,
    getProfilePicture,
    setUsernameEmail,
    updateProfile,
    getProfile,
    registerProfile
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export { ProfileProvider, ProfileContext };
