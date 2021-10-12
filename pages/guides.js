import { useContext } from "react";
import { AppContext } from "../components/utils/context/appContext";

import Head from "next/head";

const Accordion = ({ qa_list }) => {
  return (
    <div className="mt-10 lg:w-1/2 w-full space-y-10">
      {qa_list?.map((qa, index) => {
        const { title, description } = qa;

        return (
          <div key={index}>
            <p className="bg-gray-500 w-full px-3 py-2">{title}</p>
            <p className="border-l-4 border-red-600 mt-4 pl-2 pb-2">
              {description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

const GuidesPage = () => {
  const { languagePack } = useContext(AppContext);
  const guidesPage = languagePack?.guidesPage;

  return (
    <div className="bg-gray-900">
      <Head>
        <title>{guidesPage?.title}</title>
      </Head>

      <main className="flex flex-col items-center mt-10">
        <h1 className="text-4xl font-bold">{guidesPage?.title}</h1>
        <p className="pt-4 text-lg font-semibold text-center">
          {guidesPage?.description}
        </p>

        <Accordion qa_list={guidesPage?.qa} />
      </main>
    </div>
  );
};

export default GuidesPage;
