import Head from "next/head";

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
        <h1>Welcome to Dark Planets</h1>
      </main>

      <footer></footer>
    </div>
  );
}
