import { UnsplashImage } from "@/models/images";
import { log } from "console";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "../../../components/bootrstrap";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export const metadata: Metadata = {
  title: "Recupero Dinamico",
};

//export const revalidate = 15; // RICARICA PER L'INTERA PAGINA

const StaticRendering = async () => {
  const res = await fetch(
    "https://api.unsplash.com/photos/random?client_id=" +
      process.env.UNSPLASH_KEY,
    {
      next: { revalidate: 15 }, // ricarica solo la richiesta di fetch
    }
  );
  const data: UnsplashImage = await res.json();
  if (data) {
    console.log(data);
  }

  const width = Math.min(500, data.width);
  const height = (width / data.width) * data.height;

  return (
    <MaxWidthWrapper>
      <div className="d-flex flex-column align-items-center">
        <Alert className="text-justify">
          Questa pagina utilizza la rigenerazione statica incrementale. Viene
          recuperata un&apos;immagine nuova ogni 15 secondi (dopo
          l&apos;aggiornamento della pagina) e quindi servita dalla cache per
          quella durata
        </Alert>
        <Image
          src={data.urls.raw}
          width={width}
          height={height}
          alt="unsplashImages"
          className="rounded shadow mw-100 h-100"
        />
        <p>
          <Link href={"/users/" + data.user.username}>
            di {data.user.username}
          </Link>
        </p>
      </div>
    </MaxWidthWrapper>
  );
};
export default StaticRendering;
