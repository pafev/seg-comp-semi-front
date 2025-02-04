"use client";

import { type File } from "@/interfaces/i-file";
import api from "@/lib/api";
import useSWR from "swr";

export function useGetFilesReceived(params: { receiverId: number }) {
  const res = useSWR(
    ["getFilesReceived", params],
    ([_key, params]) =>
      api
        .get<File[]>(`/files/receiver_id/${params.receiverId}`)
        .then((res) => res.data),
    // { refreshInterval: 5000 },
    { shouldRetryOnError: false },
  );
  return res;
}
