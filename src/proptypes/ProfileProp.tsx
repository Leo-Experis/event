interface ProfileProp {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    dob: string;
    phoneNumber: string;
    profilePicture: string;
}

interface ProfileResponseProp {
    status_code: number,
    data: ProfileProp
}


export type { ProfileProp, ProfileResponseProp }