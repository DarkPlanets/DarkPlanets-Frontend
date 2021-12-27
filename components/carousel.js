import { useState, useEffect } from "react";

const Carousel = () => {
  const [active, setActive] = useState({ prev: 0, current: 1, next: 2 });
  const [rotate, setRotate] = useState(false);
  const images = [
    "/planets/carousel/1.png",
    "/planets/carousel/2.png",
    "/planets/carousel/3.png",
    "/planets/carousel/4.png",
    "/planets/carousel/5.png",
    "/planets/carousel/6.png",
    "/planets/carousel/7.png",
    "/planets/carousel/8.png",
    "/planets/carousel/9.png",
  ];
  const [imgOrder, _] = useState(Array.from(Array(images.length), (_, x) => x));

  const handleNodeChange = () => {
    handleClick(active.current + 1);
    imgOrder.unshift(imgOrder.splice(imgOrder.length - 1, 1)[0]);
  };

  const handleOffRotate = () => {
    setRotate(false);
  };

  useEffect(() => {
    const timerId = setInterval(handleNodeChange, 1000 * 5);
    const offRotate = setInterval(handleOffRotate, 1000 * 1);
    return () => {
      clearInterval(timerId);
      clearInterval(offRotate);
    };
  }, [handleNodeChange]);

  const handleClick = (index) => {
    let tempVal = index % images.length;
    let tempCurrent = tempVal;
    let tempPrev = tempVal - 1 < 0 ? images.length - 1 : tempVal - 1;
    let tempNext = tempVal + 1 >= images.length ? 0 : tempVal + 1;

    setRotate(!rotate);
    setActive({ prev: tempPrev, current: tempCurrent, next: tempNext });
  };

  return (
    <div className="overflow-hidden">
      <ol
        className="flex flex-row items-center carousel_view relative"
        style={{
          transition: rotate ? "all 500ms ease 0s" : "all 0ms ease 0s",
          transform: rotate ? "translateX(-883px)" : "translateX(-550px)",
        }}
      >
        {images.map((image, index) => {
          return (
            <li key={index} style={{ order: imgOrder[index] }} className="px-3">
              <img src={image} className={index === active.current ? `carousel_image` : `carousel_image`} />
            </li>
          );
        })}
      </ol>

      <div className="flex flex-row space-x-5 justify-center my-14 relative">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={active.current === index ? `carousel_pagination-active` : `carousel_pagination`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
