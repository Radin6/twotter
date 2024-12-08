export interface IUser {
  userId: number;
  email: string;
  username: string;
  profileImg: string;
}

export interface IUserResponse extends IUser {
  token: string
}