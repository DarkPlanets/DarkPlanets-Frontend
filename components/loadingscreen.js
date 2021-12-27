import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Loader = () => {
  return (
    <div>
      <div className="sk-cube-grid">
        <div className="sk-cube sk-cube1 bg-white"></div>
        <div className="sk-cube sk-cube2 bg-white"></div>
        <div className="sk-cube sk-cube3 bg-white"></div>
        <div className="sk-cube sk-cube4 bg-white"></div>
        <div className="sk-cube sk-cube5 bg-white"></div>
        <div className="sk-cube sk-cube6 bg-white"></div>
        <div className="sk-cube sk-cube7 bg-white"></div>
        <div className="sk-cube sk-cube8 bg-white"></div>
        <div className="sk-cube sk-cube9 bg-white"></div>
      </div>

      <style jsx global>{`
        .sk-cube-grid {
          width: 40px;
          height: 40px;
          margin: 10px 5px;
        }

        .sk-cube-grid .sk-cube {
          width: 33%;
          height: 33%;
          //   background-color: #333;
          float: left;
          -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
          animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
        }
        .sk-cube-grid .sk-cube1 {
          -webkit-animation-delay: 0.2s;
          animation-delay: 0.2s;
        }
        .sk-cube-grid .sk-cube2 {
          -webkit-animation-delay: 0.3s;
          animation-delay: 0.3s;
        }
        .sk-cube-grid .sk-cube3 {
          -webkit-animation-delay: 0.4s;
          animation-delay: 0.4s;
        }
        .sk-cube-grid .sk-cube4 {
          -webkit-animation-delay: 0.1s;
          animation-delay: 0.1s;
        }
        .sk-cube-grid .sk-cube5 {
          -webkit-animation-delay: 0.2s;
          animation-delay: 0.2s;
        }
        .sk-cube-grid .sk-cube6 {
          -webkit-animation-delay: 0.3s;
          animation-delay: 0.3s;
        }
        .sk-cube-grid .sk-cube7 {
          -webkit-animation-delay: 0s;
          animation-delay: 0s;
        }
        .sk-cube-grid .sk-cube8 {
          -webkit-animation-delay: 0.1s;
          animation-delay: 0.1s;
        }
        .sk-cube-grid .sk-cube9 {
          -webkit-animation-delay: 0.2s;
          animation-delay: 0.2s;
        }

        @-webkit-keyframes sk-cubeGridScaleDelay {
          0%,
          70%,
          100% {
            -webkit-transform: scale3D(1, 1, 1);
            transform: scale3D(1, 1, 1);
          }
          35% {
            -webkit-transform: scale3D(0, 0, 1);
            transform: scale3D(0, 0, 1);
          }
        }

        @keyframes sk-cubeGridScaleDelay {
          0%,
          70%,
          100% {
            -webkit-transform: scale3D(1, 1, 1);
            transform: scale3D(1, 1, 1);
          }
          35% {
            -webkit-transform: scale3D(0, 0, 1);
            transform: scale3D(0, 0, 1);
          }
        }
      `}</style>
    </div>
  );
};

const LoadingScreen = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => {
      setLoading(true);
    };
    const handleComplete = (url) => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeError", handleComplete);
    router.events.on("routeChangeComplete", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeError", handleComplete);
      router.events.off("routeChangeComplete", handleComplete);
    };
  }, []);

  if (loading)
    return (
      <div className="flex flex-col min-h-screen text-white text-center bg-gray-800 pt-44">
        <div className="flex justify-center">
          <Loader />
        </div>
        <p className="text-2xl font-bold mt-5">Loading screen...</p>
      </div>
    );

  return children;
};

export { LoadingScreen as default, Loader };
