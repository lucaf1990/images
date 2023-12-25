import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function Home() {
  return (
    <MaxWidthWrapper>
      <div className="container ">
        <h1 className="display-4 m-4 text-center underline-offset-2 underline text-gray-400">
          Cos&apos;è Next.js?
        </h1>
        <p className="lead text-justify m-4 ">
          Next.js è un framework React per lo sviluppo di applicazioni web
          full-stack. Utilizza i componenti React per creare interfacce utente e
          integra Next.js per aggiungere funzionalità e ottimizzazioni.
        </p>
        <p>
          In dettaglio, Next.js astrae e configura automaticamente gli strumenti
          necessari per React, come il bundling e la compilazione. Ciò consente
          di concentrarsi sulla costruzione dell&apos;applicazione anziché sulla
          configurazione.
        </p>
        <p>
          Che tu sia uno sviluppatore individuale o faccia parte di un team più
          ampio, Next.js può aiutarti a creare applicazioni React interattive,
          dinamiche e veloci.
        </p>

        <h2 className="mt-4 text-2xl text-gray-400 hover:underline-offset-2 hover:underline hover:cursor-default">
          Principali Caratteristiche
        </h2>
        <ul className="list-group text-justify">
          <li className="list-group-item">
            <strong>Routing:</strong> Un router basato sul file system costruito
            su Server Components che supporta layout, routing nidificato,
            gestione degli stati di caricamento, errori e altro ancora.
          </li>
          <li className="list-group-item">
            <strong>Rendering:</strong> Renderizzazione lato client e lato
            server con Componenti client e server. Ulteriormente ottimizzato con
            rendering statico e dinamico sul server tramite Next.js. Streaming
            su Edge e runtime Node.js.
          </li>
          <li className="list-group-item">
            <strong>Recupero Dati:</strong> Recupero semplificato dei dati con
            async/await in Server Components e un&apos;API fetch estesa per la
            memorizzazione delle richieste, la memorizzazione nella cache dei
            dati e la riconvalida.
          </li>
          <li className="list-group-item">
            <strong>Styling:</strong> Supporto per i tuoi metodi di stile
            preferiti, tra cui CSS Modules, Tailwind CSS e CSS-in-JS.
          </li>
          <li className="list-group-item">
            <strong>Ottimizzazioni:</strong> Ottimizzazioni per immagini, font e
            script per migliorare i Core Web Vitals e l&apos;esperienza utente
            dell&apos;applicazione.
          </li>
          <li className="list-group-item">
            <strong>TypeScript:</strong> Miglior supporto per TypeScript, con
            una verifica dei tipi più accurata e una compilazione più
            efficiente, oltre a un plugin TypeScript personalizzato e un type
            checker.
          </li>
        </ul>
      </div>
    </MaxWidthWrapper>
  );
}
