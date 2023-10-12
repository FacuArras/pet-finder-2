import Card from "../components/Card";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { token } from "../hooks/atoms";
import { useNavigate } from "react-router-dom";
import noPetsImage from "../img/empty.png";
import getPetsNearby from "../hooks/getPetsNearby";
import createReport from "../hooks/createReport";
import getOnePet from "../hooks/getOnePet";

export default function LostPets() {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useRecoilState(token);
  const [isLocation, setIsLocation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getPets(userCoords) {
      try {
        const data = await getPetsNearby(userCoords.lat, userCoords.lng);
        console.log(data.hits);
        setPets(data.hits);
        setIsLocation(true);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    async function getUserLocation() {
      try {
        const position = (await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        })) as any;

        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        getPets({ lat: userLat, lng: userLng });
      } catch {
        setIsLoading(false);
      }
    }

    getUserLocation();
  }, []);

  const handleOnReport = async (data) => {
    setIsLoading(true);
    const ownerInfo = await getOnePet(data.id);
    const reportResponse = await createReport(
      data.id,
      data.data.name,
      data.data.lastSeen,
      ownerInfo.user.email,
      ownerInfo.full_name,
      data.data.phoneNumber
    );
    navigate(0);
  };

  return isLoading ? (
    <div className="flex justify-center h-[85vh] items-center">
      <div className="loader"></div>
    </div>
  ) : isLocation ? (
    pets.length >= 1 ? (
      <main className="bg-gradient-to-b from-white to-[#def4f0] pt-12 pb-6 px-5 min-h-[80vh]">
        <h1 className="font-bold text-[#1a2631] text-3xl text-center">
          Mascotas perdidas cerca
        </h1>

        {pets.map((pet) => {
          return (
            <Card
              id={pet.objectID}
              key={pet.objectID}
              imageURL={pet.pet_picture_URL}
              name={pet.full_name}
              place={pet.last_seen}
              page={"lost"}
              onReport={(data) => {
                handleOnReport(data);
              }}
            />
          );
        })}
      </main>
    ) : (
      <main className="bg-gradient-to-b from-white to-[#def4f0] pt-12 pb-6 px-5 min-h-[80vh]">
        <h1 className="font-bold text-[#1a2631] text-3xl text-center">
          No hay mascotas perdidas cerca de tu ubicación
        </h1>

        <img
          src={noPetsImage}
          className="block mx-auto mt-20"
          alt="noPetsNearbyImage"
        />
      </main>
    )
  ) : (
    <main className="bg-gradient-to-b from-white to-[#def4f0] px-5 min-h-[80vh] flex flex-col justify-center">
      <h1 className="font-bold text-[#1a2631] text-3xl text-center">
        Para poder ver las mascotas cerca de tu ubicación tenés que dejarnos ver
        tu ubicación primero...
      </h1>
    </main>
  );
}
