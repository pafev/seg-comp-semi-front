"use client";

import { type User } from "@/interfaces/i-user";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { type PropsWithChildren, useEffect, useState } from "react";
import { deleteCookie, getCookie, setCookie } from "cookies-next/client";
import { env } from "@/env";
import { AuthContext } from "./auth-context";

const tokenName = env.NEXT_PUBLIC_TOKEN_NAME;

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const isAuthenticated = !!user;

  useEffect(() => {
    const token = getCookie(tokenName);
    if (token) {
      api
        .get<User>(`/users/user_id/${token}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          deleteCookie(tokenName);
          console.log(err);
        });
    }
  }, [router]);

  async function signIn({
    name,
    password,
  }: {
    name: string;
    password: string;
  }) {
    const userApiRes = await api.post<User>(`/users/sign-in`, {
      name: name,
      password: password,
    });
    setCookie(tokenName, userApiRes.data.id.toString(), {
      secure: true,
      maxAge: 60 * 60 * 12,
    });
    setUser(userApiRes.data);
    router.push("/");
  }

  async function signOut() {
    deleteCookie(tokenName);
    setUser(null);
    router.refresh();
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
