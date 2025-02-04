"use client";

import { useAuth } from "@/auth/use-auth";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1),
  password: z.string().min(1),
});

export function useSignInForm() {
  const { signIn } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });
  const { toast } = useToast();

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    try {
      await signIn({ name: values.name.trim(), password: values.password });
      toast({ title: "Sucesso", description: "Usuário logado com sucesso" });
    } catch {
      form.setError("name", {
        message: "Não foi possível entrar. Verifique nome e senha",
        type: "validate",
      });
    }
  }

  return { form, handleSubmit };
}
