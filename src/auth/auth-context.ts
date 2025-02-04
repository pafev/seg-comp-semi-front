import { type User } from "@/interfaces/i-user";
import { createContext } from "react";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (signInInput: { name: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);
export type { AuthContextType };
