import { create } from "zustand";
import { IUser } from "../types/user";

interface State {
  user: IUser | null;
}

interface Action {
  setUser: (user: State['user'])=>void;
}

const userStore = create<State & Action>((set)=>({
  user: null,
  setUser: (user) => set(() => ({user: user}))
}))

export default userStore;