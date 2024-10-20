import { create } from "zustand";
import { IUser } from "../types/user";
import { persist } from "zustand/middleware";

interface UserStore {
  user: IUser | null;
  setUser: (newUser: IUser) => void;
}

const userStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      setUser: (user) => set(() => ({ user })),
    }),
    {
      name: "user-storage",
    }
  )
);

export default userStore;