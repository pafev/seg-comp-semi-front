"use client";

import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1),
  password: z.string().min(1),
  repeatPassword: z.string().min(1),
});

export function useSignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password: "",
      repeatPassword: "",
    },
  });
  const { toast } = useToast();
  const router = useRouter();

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    if (values.repeatPassword !== values.password) {
      form.setError("repeatPassword", {
        message: "As senhas não coincidem",
        type: "pattern",
      });
      return;
    }

    try {
      await api.post("/users", {
        name: values.name.trim(),
        password: values.password,
      });
      router.push("/sign-in");
      toast({
        title: "Sucesso!!",
        description: "Usuário cadastrado com sucesso",
      });
    } catch {
      form.setError("name", {
        message: "Não foi possível cadastrar usuário",
        type: "validate",
      });
    }
  }

  return { form, handleSubmit };
}
