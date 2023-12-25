import { UnsplashImageUser } from "@/models/images";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache, use } from "react";
import { Alert } from "../../../../components/bootrstrap";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface Props {
  params: { username: string };
}

const getUser = async (username: string): Promise<UnsplashImageUser> => {
  const res = await fetch(
    `https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_KEY}`
  );
  if (res.status === 404) notFound();

  return await res.json();
};

// La richiesta fetch è automaticamente deduplicata da Next.js
// Se utilizziamo una libreria e non usiamo il fetch nativo, è necessario memorizzare nella cache il valore della fetch
// E invece di utilizzare la funzione getUser, utilizziamo la funzione getUserCached
const getUserCached = cache(getUser); // da React

export async function generateMetadata({
  params: { username },
}: Props): Promise<Metadata> {
  const metadata = await getUser(username);
  return {
    title:
      ([metadata.first_name, metadata.last_name].filter(Boolean).join(" ") ||
        metadata.username) + " - Next.js 13 Images",
  };
}

const User = async ({ params: { username } }: Props) => {
  const user = await getUser(username);

  return (
    <MaxWidthWrapper>
      <Alert>
        Questa pagina del profilo utilizza generateMetadata per impostare
        dinamicamente il titolo della pagina dalla risposta dell&apos;API.
      </Alert>
      <div className="bg-gray-300 rounded-md d-flex  justify-center p-4 ">
        <div className="m-4">
          <Image
            src={user.profile_image.large}
            className="rounded-md"
            alt="userImage"
            width={200}
            height={200}
          />
        </div>
        <div className="m-3">
          {" "}
          <Card>
            <CardHeader>
              <CardTitle> {user.username.toUpperCase()}</CardTitle>
              <CardDescription>Author</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{user.last_name ? "Cognome: " + user.last_name : null}</p>
              <p>{user.first_name ? "Nome : " + user.first_name : null}</p>
            </CardContent>
            <CardFooter>
              <Link href={"https://unsplash.com/" + user.username}>
                Visita l&apos;artista su <strong>Unsplash.com</strong>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};
export default User;
