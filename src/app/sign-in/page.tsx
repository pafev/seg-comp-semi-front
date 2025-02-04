"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useSignInForm } from "./_components/use-sign-in-form";
import { Separator } from "@/components/ui/separator";

export default function SignInPage() {
  const { handleSubmit, form } = useSignInForm();
  const [showPassword, setShowPassword] = useState(false);

  function handleViewPassword() {
    setShowPassword((prev) => !prev);
  }

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div className="flex w-3/4 max-w-96 flex-col rounded border-2 px-9 py-7 shadow">
        <h1 className="mx-auto">Entre com sua conta</h1>
        <Separator className="mx-auto my-4 w-1/2" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Nome *</FormLabel>
                  <FormControl>
                    <Input placeholder="nome do usuário" {...field} />
                  </FormControl>
                  {!fieldState.invalid && (
                    <FormDescription>Digite o nome do usuário</FormDescription>
                  )}
                  {fieldState.invalid && <FormMessage />}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem className="relative">
                  <FormLabel>Senha *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="senha do usuário"
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>
                  <Button
                    onClick={handleViewPassword}
                    variant={"ghost"}
                    type="button"
                    size={"sm"}
                    className="absolute right-1 top-[1.65rem] rounded-full opacity-70 backdrop-blur"
                  >
                    {!showPassword && <FaEye size={14} />}
                    {showPassword && <FaEyeSlash size={14} />}
                  </Button>
                  {!fieldState.invalid && (
                    <FormDescription>Digite a senha do usuário</FormDescription>
                  )}
                  {fieldState.invalid && <FormMessage />}
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="my-2"
              disabled={form.formState.isSubmitting}
            >
              Entrar
            </Button>
          </form>
        </Form>
        <Link
          className={buttonVariants({
            variant: "link",
            className: "mx-auto py-0",
          })}
          href={"/sign-up"}
        >
          Não possuo uma conta
        </Link>
      </div>
    </main>
  );
}
