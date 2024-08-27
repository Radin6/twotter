export interface IUser {
  userId: number;
  email: string;
  profileImg: string;
}

export interface IUserResponse extends IUser {
  token: string
}