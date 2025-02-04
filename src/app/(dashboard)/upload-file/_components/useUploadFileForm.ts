"use client";

import { useAuth } from "@/auth/use-auth";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  receiver_name: z.string(),
  file: z
    .instanceof(globalThis.File, {
      message: "Selecione um arquivo",
    })
    .refine((file) => file.size < 7000000, {
      message: "Arquivo deve conter menos de 7MB",
    }),
});

export function useUploadFileForm() {
  const { user } = useAuth();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      receiver_name: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    const fileBase64URL = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(values.file);
    });
    const [fileType, fileBase64] = fileBase64URL.split(";base64,");
    try {
      await api.post<File>("/files/upload", {
        file_name: values.file.name,
        file_type: fileType,
        file_base64: fileBase64,
        receiver_name: values.receiver_name,
        sender_id: user?.id ?? NaN,
      });
      toast({
        title: "Sucesso!!",
        description: "Arquivo carregado com sucesso",
      });
    } catch {
      toast({
        title: "Erro...",
        description: "Não foi possível enviar o arquivo",
      });
    }
  }

  return { form, handleSubmit };
}
