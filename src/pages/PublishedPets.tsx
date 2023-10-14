import { useState, useEffect } from "react";
import Card from "../components/Card";
import { useRecoilState } from "recoil";
import { token } from "../api/atoms";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import noPetsImage from "../img/empty.png";
import getPetsFromUser from "../api/pet/getPetsFromUser";
import deleteOnePet from "../api/pet/deleteOnePet";
import Loader from "../components/Loader";
import scrollToTop from "../hook/scrollToTop";

export default function PublishedPets() {
  scrollToTop();
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useRecoilState(token);
  const navigate = useNavigate();

  useEffect(() => {
    async function getPets() {
      const data = await getPetsFromUser(userToken);
      console.log(data);
      setPets(data);
      setIsLoading(false);
    }

    getPets();
  }, []);

  const handleOnDeletePet = async (petId) => {
    try {
      setIsLoading(true);

      const response = await deleteOnePet(userToken, petId);

      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <Loader />
  ) : pets && pets.length > 0 ? (
    <main className="bg-gradient-to-b from-white to-[#def4f0] pt-12 pb-6 px-5 min-h-[80vh]">
      <h1 className="font-bold text-tertiaryColor text-3xl text-center">
        Mis mascotas reportadas
      </h1>

      {pets.map((pet) => {
        return (
          <Card
            id={pet.id}
            key={pet.id}
            imageURL={pet.pet_picture_URL}
            name={pet.full_name}
            page={"published"}
            place={pet.last_seen}
            found={pet.state}
            onDeletePet={() => handleOnDeletePet(pet.id)}
          />
        );
      })}
    </main>
  ) : (
    <main className="bg-gradient-to-b from-white to-[#def4f0] py-12 px-5 min-h-[80vh]">
      <h1 className="font-bold text-tertiaryColor text-3xl text-center">
        Todavía no reportaste ninguna mascota
      </h1>
      <img
        src={noPetsImage}
        className="block mx-auto mt-20"
        alt="noPetsPublishedImage"
      />
      <Link to={"/publish-pet"}>
        <Button
          type={"button"}
          color={"bg-primaryColor"}
          margin={"mt-16"}
          small={false}
        >
          Publicar nuevo reporte
        </Button>
      </Link>
    </main>
  );
}
