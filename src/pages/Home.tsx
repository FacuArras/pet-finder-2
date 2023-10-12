import { useEffect, useState } from "react";
import Button from "../components/Button";
import homeImage from "../img/home-image.png";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { token, userProfile } from "../hooks/atoms";

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-white to-[#def4f0] py-12 px-5 min-h-[80vh] flex flex-col justify-center">
      <img src={homeImage} alt="homeImage" className="block mx-auto" />
      <h1 className="font-bold text-[#1a82b9] text-3xl text-center mt-4">
        Pet Finder App
      </h1>
      <h2 className="font-medium text-xl text-center mt-2 mb-5">
        Encontrá y reportá mascotas perdidas cerca de tu ubicación
      </h2>

      <Link to={"/lost-pets"}>
        <Button
          type={"button"}
          color={"bg-[#1a82b9]"}
          margin={"mt-6"}
          small={false}
        >
          Mascotas perdidas cerca
        </Button>
      </Link>

      <Link to={"/publish-pet"}>
        <Button
          type={"button"}
          color={"bg-[#12517e]"}
          margin={"mt-6"}
          small={false}
        >
          Reportar mascota perdida
        </Button>
      </Link>
    </main>
  );
}
