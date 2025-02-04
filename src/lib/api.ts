import { env } from "@/env";
import axios from "axios";

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    "Access-Control-Allow-Headers": "*",
    "Content-Type": "application/json",
  },
});

export default api;
