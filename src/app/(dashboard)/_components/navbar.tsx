import { getAuth } from "@/auth/get-auth";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { SignOutButton } from "./sign-out-button";

export async function Navbar() {
  const user = await getAuth();
  return (
    <nav className="fixed z-20 flex h-16 w-screen items-center justify-between border-b-2 bg-white px-2 text-sm text-zinc-700 shadow-md lg:px-8">
      <Link href={"/"}>Bem Vindo, {user?.name}</Link>
      <ul className="flex items-center gap-4">
        <li>
          <Link
            className={buttonVariants({ variant: "ghost" })}
            href={"/files"}
          >
            Arquivos Recebidos
          </Link>
        </li>
        <li>
          <Link
            className={buttonVariants({ variant: "ghost" })}
            href={"/upload-file"}
          >
            Enviar Arquivo
          </Link>
        </li>
        <Separator orientation="vertical" className="h-1/2" />
        <li>
          <SignOutButton>Sair</SignOutButton>
        </li>
      </ul>
    </nav>
  );
}
