import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div className="mx-auto container">
      <Head>
        <title>Dark Planets</title>
        <meta
          name="This will be the frontend application for dark planets"
          content="Dark Planets front end"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-center items-center h-screen">
        <Image
          src="/planets/planet08.png"
          width={250}
          height={250}
          alt="planet"
        />
      </main>

      <footer></footer>
    </div>
  );
}
