"use client";

import { Button } from "@/components/ui/button";
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
import { useUploadFileForm } from "./_components/useUploadFileForm";
import { Separator } from "@/components/ui/separator";

export default function UploadFilePage() {
  const { handleSubmit, form } = useUploadFileForm();

  return (
    <main className="flex h-screen w-screen items-center justify-center pt-16">
      <div className="flex w-3/4 max-w-96 flex-col rounded border-2 px-9 py-7 shadow">
        <h1 className="mx-auto">Envia um arquivo para alguém</h1>
        <Separator className="mx-auto my-4 w-1/2" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="receiver_name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Nome do Usuario *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Usuario" />
                  </FormControl>
                  {!fieldState.invalid && (
                    <FormDescription>
                      Digite o nome do usuário a receber arquivo
                    </FormDescription>
                  )}
                  {fieldState.invalid && <FormMessage />}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={({
                field: { value: _value, onChange, ...field },
                fieldState,
              }) => (
                <FormItem>
                  <FormLabel>Arquivo *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="file"
                      placeholder="Carregue o arquivo"
                      accept="application/pdf,image/*"
                      onChange={(ev) => {
                        onChange(ev.target.files?.[0]);
                      }}
                    />
                  </FormControl>
                  {!fieldState.invalid && (
                    <FormDescription>
                      Carregue o arquivo para ser enviado
                    </FormDescription>
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
              Enviar
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
