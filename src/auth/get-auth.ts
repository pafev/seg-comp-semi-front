import { env } from "@/env";
import { type User } from "@/interfaces/i-user";
import api from "@/lib/api";
import { cookies } from "next/headers";

export async function getAuth() {
  try {
    const user_id = (await cookies()).get(env.NEXT_PUBLIC_TOKEN_NAME)?.value;
    const res = await api.get<User>(`/users/user_id/${user_id}`);
    return res.data;
  } catch {}
}
