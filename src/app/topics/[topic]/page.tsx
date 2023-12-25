import { UnsplashImage } from "@/models/images";
import Image from "next/image";
import styles from "./TopicPage.module.css";
import { Alert } from "../../../components/bootrstrap";
import { Metadata } from "next";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

interface Props {
  // corrisponde al router dinamico
  params: { topic: string };
  // searchParams: {[key: string]: string | string[] | undefined}
}

// se vogliamo immagini diverse ogni volta che ricarichiamo - export const revalidate = 0;

// SE VOGLIAMO RENDERE ALCUNE DELLE PAGINE IN MODO AVANZATO

export function generateStaticParams() {
  return ["health", "men", "coding"].map((topic) => ({ topic }));
}

// SE VOGLIAMO PERMETTERE SOLO PARAMETRI PARTICOLARI

// export const dynamicParams = false; // solo i tre parametri in generateStaticParams saranno parametri validi

// GENERA TITOLO DINAMICO

export function generateMetadata({ params: { topic } }: Props): Metadata {
  return {
    title: topic.toLocaleUpperCase() + "-" + "Genera metadati dinamici",
  };
}

const Topics = async ({ params: { topic } }: Props) => {
  const res = await fetch(
    `https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.UNSPLASH_KEY}`
  );
  const img: UnsplashImage[] = await res.json();

  return (
    <MaxWidthWrapper className="">
      <Alert className="text-justify">
        Questa pagina utilizza generateStaticParams per renderizzare e
        memorizzare in cache pagine statiche al momento della compilazione,
        anche se l&apos;URL ha un parametro dinamico. Le pagine che non sono
        incluse in generateStaticParams saranno recuperate e renderizzate al
        primo accesso e quindi memorizzate per le richieste successive (questo
        può essere disabilitato).
      </Alert>
      <h1 className="text-3xl m-4 underline-offset-2 underline">
        {topic.toUpperCase()}
      </h1>
      <div className="d-flex flex-wrap  justify-center">
        {img.map((img) => (
          <Image
            src={img.urls.raw}
            alt="unsplash"
            width={150}
            height={120}
            key={img.urls.raw}
            className={styles.image}
          />
        ))}
      </div>
    </MaxWidthWrapper>
  );
};
export default Topics;
