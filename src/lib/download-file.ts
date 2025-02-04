"use client";

import { type File } from "@/interfaces/i-file";

export async function downloadFile(file: File) {
  const fileUrl = file.file_type + ";base64," + file.file_base64;
  const fileBlob = await (await fetch(fileUrl)).blob();
  const objectUrl = window.URL.createObjectURL(fileBlob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.setAttribute("download", file.file_name);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
