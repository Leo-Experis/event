interface UserProp {
  username: string;
  email: string;
  password: string;
}

interface ProfileProp {
  firstName: string;
  lastName: string;
  dob: Date;
  phonenumber: string;
  username: string;
  email: string;
}

export type { UserProp, ProfileProp };
