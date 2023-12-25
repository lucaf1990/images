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

const DynamicRendering = async () => {
  const res = await fetch(
    "https://api.unsplash.com/photos/random?client_id=" +
      process.env.UNSPLASH_KEY,
    {
      // OPZIONE 1
      // cache: "no-cache",

      // OPZIONE 2
      // cache: "no-store",

      // OPZIONE 3
      next: { revalidate: 0 },
    }
  );
  const data: UnsplashImage = await res.json();

  // Stampa i dati ottenuti dalla API sulla console, se presenti
  if (data) {
    console.log(data);
  }

  // Calcola le dimensioni dell'immagine per renderla responsiva
  const width = Math.min(500, data.width);
  const height = (width / data.width) * data.height;

  return (
    <MaxWidthWrapper>
      <div className="d-flex flex-column align-items-center">
        {/* Alert che spiega il funzionamento del recupero dinamico */}
        <Alert className="text-justify">
          Questa pagina recupera i dati in modo dinamico e non memorizza nella
          cache al momento della compilazione. L&apos;API di Unsplash
          restituisce sempre una nuova immagine; ogni volta che aggiorniamo la
          pagina otteniamo un&apos;immagine diversa. Possiamo definire il tempo
          di rivalidazione o utilizzare &quot;no cache&quot; o &quot;no
          store&quot;. Ricorda che abbiamo visto ben tre modi per definire un
          metodo di recupero dinamico in Next.js.
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

export default DynamicRendering;
