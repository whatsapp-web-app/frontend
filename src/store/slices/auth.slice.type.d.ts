type User={
    _id:string;
    name:string;
    username: string,
    email: string,
    profilePic: string,
    phoneNumber: string,
    status: string,
    address: string,
    bio: string,
    gender: string,
    dob: string,
    country:string,
    state: string,
    city: string,
    pincode: string,
    latitude: string,
    longitude: string,
    timezone: string,
    currency: string,
    language: string,
    fcmToken: Array<string>,
    blockedUsers: null|Array<User>,
    friendRequests:[]
    verified: boolean,
    createdAt: string,
    updatedAt: string,
    __v: number
}



type AuthState={
    isAuthenticated:boolean
    token:string;
    user:User | null
}
