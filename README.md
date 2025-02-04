# Seminario Segurança Computacional

## Requisitos

- node
- pnpm

## Como iniciar no projeto

- Dependências

Com node e pnpm instalados, instale agora as dependências necessárias para o projeto

```bash
pnpm i
```

- Variaveis de ambiente

O projeto precisa de variaveis de ambiente para rodar. Para isso, rode o seguinte comando para gerar um
arquivo `.env` apropriado

```bash
cp .env.example .env
```

Com isso, será necessário agora preencher as variáveis de ambiente necessárias. Recomendo as seguintes:

```shell
NEXT_PUBLIC_API_URL = "http://localhost:8000"
NEXT_PUBLIC_TOKEN_NAME = "auth.token"
```

Atenção: Este valor para NEXT_PUBLIC_TOKEN_NAME eh obrigatorio
Atenção 2: Rode o backend e preencha NEXT_PUBLIC_API_URL com a respectiva url do backend

- Rodando

Agora basta rodar em ambiente de desenvolvimento e acessar o site localmente na sua máquina:

```bash
pnpm dev
```
