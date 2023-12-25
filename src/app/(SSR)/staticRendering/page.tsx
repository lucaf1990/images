import { UnsplashImage } from "@/models/images";
import { log } from "console";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "../../../components/bootrstrap";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export const metadata: Metadata = {
  title: "Recupero Statico",
};

const StaticRendering = async () => {
  // Effettua una richiesta alla API di Unsplash per ottenere un'immagine casuale
  const res = await fetch(
    "https://api.unsplash.com/photos/random?client_id=" +
      process.env.UNSPLASH_KEY, // Questo non sarà mai visibile sul client poiché viene eseguito solo sul server
    // ma anche se viene eseguito sul client, restituirà undefined
    // per effettivamente visualizzare il valore, possiamo aggiungere NEXT_PUBLIC_ prima della chiave
    {
      cache: "force-cache",
    }
  );

  // Analizza la risposta come oggetto UnsplashImage
  const data: UnsplashImage = await res.json();

  // Se i dati sono presenti, stampali sulla console
  if (data) {
    console.log(data);
  }

  // Calcola le dimensioni dell'immagine per renderla responsiva
  const width = Math.min(500, data.width);
  const height = (width / data.width) * data.height;

  return (
    <MaxWidthWrapper>
      <div className="d-flex flex-column align-items-center">
        {/* Alert che spiega il funzionamento del recupero statico */}
        <Alert className="text-justify">
          Questa pagina recupera e memorizza nella cache i dati al momento della
          compilazione. Anche se l&apos;API di Unsplash restituisce sempre
          un&apos;immagine nuova, vediamo la stessa immagine dopo aver
          aggiornato la pagina fino a quando non ricompiliamo il progetto.
        </Alert>

        {/* Visualizza l'immagine ottenuta dalla API di Unsplash */}
        <Image
          src={data.urls.raw}
          width={width}
          height={height}
          alt="unsplashImages"
          className="rounded shadow mw-100 h-100"
        />

        {/* Visualizza il nome utente dell'autore dell'immagine con un link al profilo */}
        <p>
          {" "}
          di{" "}
          <Link href={"/users/" + data.user.username}>
            {data.user.username}
          </Link>
        </p>
      </div>
    </MaxWidthWrapper>
  );
};

export default StaticRendering;
