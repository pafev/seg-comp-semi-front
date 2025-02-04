"use client";

import { useAuth } from "@/auth/use-auth";
import { Button } from "@/components/ui/button";
import { type PropsWithChildren } from "react";

export function SignOutButton({ children }: PropsWithChildren) {
  const { signOut } = useAuth();
  return <Button onClick={signOut}>{children}</Button>;
}
