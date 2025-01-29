interface UserProp {
  username: string;
  email: string;
  password: string;
}

interface UserResponseProp {
  status_code: number;
  data: {
    username: string;
    email: string;
    profileSet: boolean;
    roles: [];
  };
}

interface UpdateUserProfileProp {
  profileSet: boolean;
  profileID: number;
}

export type { UserProp, UserResponseProp, UpdateUserProfileProp };
