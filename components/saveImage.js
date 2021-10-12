/* eslint-disable @next/next/no-img-element */
import { useContext } from "react";
import { saveImage } from "./utils/constants";
import { useRouter } from "next/dist/client/router";
import { AppContext } from "./utils/context/appContext";

const SaveImage = ({ stats, imageUrl }) => {
  const { languagePack } = useContext(AppContext);
  const router = useRouter();

  return (
    <>
      <div
        style={{ overflow: "hidden" }}
        className={`${
          router?.pathname === "/rarityland" ? "lg:w-full" : "lg:w-1/2 w-full"
        } h-96 border z-50`}
      >
        <img
          src={imageUrl || stats?.image}
          alt="dp_image"
          style={{ maxWidth: "initial" }}
        />
      </div>

      <button
        onClick={() => saveImage(imageUrl || stats.image)}
        className={`${
          router?.pathname === "/rarityland" ? "lg:w-full" : "w-full lg:w-1/2"
        } bg-blue-500 mt-3 rounded-md py-3 z-50`}
      >
        {languagePack?.indexPage?.save_image_btn}
      </button>
    </>
  );
};

export default SaveImage;
