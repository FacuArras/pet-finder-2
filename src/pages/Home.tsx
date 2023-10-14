import Button from "../components/Button";
import homeImage from "../img/home-image.png";
import scrollToTop from "../hook/scrollToTop";
import { Link } from "react-router-dom";

export default function Home() {
  scrollToTop();

  return (
    <main className="bg-gradient-to-b from-white to-[#def4f0] py-12 px-5 min-h-[80vh] flex flex-col justify-center">
      <img
        src={homeImage}
        alt="Imágen principal de Pet Finder App"
        className="block mx-auto"
      />
      <h1 className="font-bold text-primaryColor text-3xl text-center mt-4">
        Pet Finder App
      </h1>
      <h2 className="font-medium text-xl text-center mt-2 mb-5">
        Encontrá y reportá mascotas perdidas cerca de tu ubicación
      </h2>

      <Link to={"/lost-pets"}>
        <Button
          type={"button"}
          color={"bg-primaryColor"}
          margin={"mt-6"}
          small={false}
        >
          Mascotas perdidas cerca
        </Button>
      </Link>

      <Link to={"/publish-pet"}>
        <Button
          type={"button"}
          color={"bg-secondaryColor"}
          margin={"mt-6"}
          small={false}
        >
          Reportar mascota perdida
        </Button>
      </Link>
    </main>
  );
}
