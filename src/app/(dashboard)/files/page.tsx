"use client";

import { useAuth } from "@/auth/use-auth";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { type File } from "@/interfaces/i-file";
import api from "@/lib/api";
import { downloadFile } from "@/lib/download-file";
import { useGetFilesReceived } from "./_components/use-get-files-received";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function FilesPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: files, isLoading } = useGetFilesReceived({
    receiverId: user?.id ?? NaN,
  });
  const [currentLoading, setCurrrentLoading] = useState<number>();

  async function handleVerifyFile(file_id: number) {
    setCurrrentLoading(() => file_id);
    try {
      const res = await api.get<File>(`/files/verify/file_id/${file_id}`);

      toast({
        title: "Sucesso",
        description: "Arquivo verificado com sucesso",
      });

      await downloadFile(res.data);
    } catch {
      toast({
        title: "Erro ao verificar arquivo",
        description: "Ocorreu um erro na verificação do arquivo",
        variant: "destructive",
      });
    }
    setCurrrentLoading(() => undefined);
  }

  function isLoadingFile(file_id: number) {
    if (currentLoading === file_id) {
      return true;
    }
  }

  if (isLoading)
    return (
      <main className="flex w-screen flex-col items-center gap-4 px-2 pt-16 lg:px-8">
        <h1 className="mt-4 self-start text-lg font-semibold">
          Arquivos Recebidos
        </h1>
        <Separator className="my-4" />
        <Skeleton className="h-20 w-[80%]" />
        <Skeleton className="h-20 w-[80%]" />
      </main>
    );

  return (
    <main className="flex w-screen flex-col px-2 pt-16 lg:px-8">
      <h1 className="mt-4 text-lg font-semibold">Arquivos Recebidos</h1>
      <Separator className="my-4" />
      <ul className="px-auto mt-2 grid w-full grid-cols-1 items-center gap-5">
        {files?.map((file) => (
          <li key={file.id} className="mx-auto w-[80%]">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Arquivo {file.file_name}
                </CardTitle>
                <CardDescription>
                  Enviado pelo usuario de ID {file.sender_id}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 text-sm">
                <div>
                  <span className="font-semibold">Base64: </span>
                  <span className="line-clamp-1 overflow-ellipsis">
                    {file.file_base64.slice(0, 72)}...
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Assinatura: </span>
                  <span className="line-clamp-1">
                    {file.signature.slice(0, 72)}...
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Chave Pública Usada: </span>
                  <span className="line-clamp-1">
                    {file.public_key.slice(0, 72)}...
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={isLoadingFile(file.id)}
                  onClick={() => handleVerifyFile(file.id)}
                >
                  Verificar e Baixar
                </Button>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </main>
  );
}
