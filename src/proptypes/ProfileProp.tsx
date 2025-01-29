interface ProfileProp {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  dob: string;
  phoneNumber: string;
  profilePicture: Blob | null;
}

interface ProfileResponseProp {
  status_code: number;
  data: ProfileProp;
}

export type { ProfileProp, ProfileResponseProp };
