/* eslint-disable @next/next/no-img-element */
import { useContext } from "react";
import { saveImage } from "./utils/constants";
import { AppContext } from "./utils/context/appContext";

const SaveImage = ({ stats, imageUrl }) => {
  const { languagePack } = useContext(AppContext);

  return (
    <>
      <div
        style={{ overflow: "hidden" }}
        className="lg:w-1/2 w-full sm:max-h-96 max-h-60 border z-50"
      >
        <img
          src={imageUrl || stats.image}
          alt="dp_image"
          style={{ maxWidth: "initial" }}
        />
      </div>

      <button
        onClick={() => saveImage(imageUrl || stats.image)}
        className="bg-blue-500 md:w-1/2 w-full mt-3 rounded-md py-3 z-50"
      >
        {languagePack?.indexPage?.save_image_btn}
      </button>
    </>
  );
};

export default SaveImage;
