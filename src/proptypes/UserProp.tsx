import { MyResponse } from "./ResponseProp";

interface UserProp {
  username: string;
  email: string;
  password: string;
}

interface UserResponseProp
  extends MyResponse<{
    username: string;
    email: string;
    profileSet: boolean;
    roles: [];
  }> {}

interface UpdateUserProfileProp {
  profileSet: boolean;
  profileID: number;
}

export type { UserProp, UserResponseProp, UpdateUserProfileProp };
