import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { token } from "../hooks/atoms";
import Button from "../components/Button";
import Dropzone from "../components/DropzoneComponent";
import Map from "../components/Map";
import getOnePet from "../hooks/getOnePet";
import setPetFound from "../hooks/setPetFound";
import deleteOnePet from "../hooks/deleteOnePet";
import updateOnePet from "../hooks/updateOnePet";

type Inputs = {
  name: string;
  description: string;
};

export default function UpdatePets() {
  const location = useLocation();
  const navigate = useNavigate();
  const [pictureURL, setPictureURL] = useState();
  const [userToken, setUserToken] = useRecoilState(token);
  const [petInfo, setPetInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [petLocation, setPetLocation] = useState({
    lat: undefined,
    lng: undefined,
    name: undefined,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    async function getPet() {
      const data = await getOnePet(Number(location.pathname.split("/")[2]));
      console.log(data);
      setPetInfo(data);
      setIsLoading(false);
    }

    getPet();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);

    const pet = {
      name: data.name ? data.name : petInfo.full_name,
      description: data.description ? data.description : petInfo.description,
    };

    try {
      const response: any = await updateOnePet(
        userToken,
        Number(location.pathname.split("/")[2]),
        pet.name,
        petLocation.lat,
        petLocation.lng,
        pet.description,
        "lost",
        petLocation.name,
        pictureURL
      );

      navigate("/published-pets");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePictureURL = (url) => {
    setPictureURL(url);
  };

  const handleSetLocation = (loc) => {
    setPetLocation(loc);
  };

  const handlePetFound = async () => {
    try {
      setIsLoading(true);

      const response = await setPetFound(
        userToken,
        Number(location.pathname.split("/")[2])
      );

      navigate("/published-pets");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePet = async () => {
    try {
      setIsLoading(true);

      const response = await deleteOnePet(
        userToken,
        Number(location.pathname.split("/")[2])
      );

      navigate("/published-pets");
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <div className="flex justify-center h-[85vh] items-center">
      <div className="loader"></div>
    </div>
  ) : (
    <main className="bg-gradient-to-b from-white to-[#def4f0] py-8 px-5 min-h-[80vh] flex flex-col justify-center">
      <h1 className="font-bold text-3xl text-center mt-6 mb-5 text-[#1a2631]">
        Editar reporte de mascota perdida
      </h1>
      <h2 className="font-medium text-xl text-center mb-10">
        Ingresá los siguientes datos para actualizar el reporte de tu mascota
        perdida
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full max-w-[285px] mx-auto"
      >
        <label>
          <p className="font-medium text-lg">Nombre</p>
          <input
            className="p-1 text-lg rounded-sm shadow-md w-full placeholder-black"
            type="text"
            {...register("name")}
            autoComplete="name"
            placeholder={petInfo.full_name}
          />
        </label>

        <p className="font-medium text-lg">Foto de tu mascota</p>
        <Dropzone
          bg={petInfo.pet_picture_URL}
          pictureURL={handlePictureURL}
          isActive={true}
        />

        <p className="font-medium text-lg">
          Marcá en el mapa el útlimo lugar en donde la viste (Tenés que poner la
          ubicación en el buscador y después, tocando el mapa, poner un marcador
          en un lugar más preciso)
        </p>
        <Map
          onSetLocation={handleSetLocation}
          center={{
            lng: petInfo.last_location_lng,
            lat: petInfo.last_location_lat,
          }}
          placeholder={petInfo.last_seen}
        />

        <label className="mt-4">
          <p className="font-medium text-lg">
            Información útil para poder encontrarla
          </p>
          <textarea
            className="p-1 text-lg rounded-sm shadow-md w-full resize-none placeholder-black"
            {...register("description")}
            id="petDescription"
            cols={30}
            rows={5}
            placeholder={petInfo.description}
          ></textarea>
        </label>

        <Button
          type={"submit"}
          color={"bg-[#12517e]"}
          margin={"mt-2"}
          small={false}
        >
          Actualizar información
        </Button>
        <Button
          type={"button"}
          color={"bg-[#1a82b9]"}
          margin={""}
          small={false}
          onClick={handlePetFound}
        >
          Reportar como encontrado
        </Button>
        <Button
          type={"button"}
          color={"bg-[#12517e]"}
          margin={""}
          small={false}
          onClick={handleDeletePet}
        >
          Eliminar reporte
        </Button>
      </form>
    </main>
  );
}
