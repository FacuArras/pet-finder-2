import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoSvg from "../img/logo.svg";
import { useRecoilValue } from "recoil";
import { useRecoilState } from "recoil";
import { token, userProfile } from "../api/atoms";

export default function Header() {
  const [offcanvas, setOffcanvas] = useState(false);
  const [userToken, setUserToken] = useRecoilState(token);
  const userProfileInfo = useRecoilValue(userProfile);
  const navigate = useNavigate();

  const toggleOffcanvas = () => {
    setOffcanvas(!offcanvas);
  };

  const handleLogOut = () => {
    localStorage.removeItem("pet-finder");
    navigate("/");
    navigate(0);
  };

  return (
    <header className="z-10 sticky top-0 w-full shadow-xl">
      <nav className="bg-tertiaryColor flex justify-between items-center py-6 px-4">
        <Link to={"/"}>
          <img
            src={logoSvg}
            alt="Pet Finder App Logo"
            onClick={() => {
              setOffcanvas(false);
            }}
          />
        </Link>

        <button
          onClick={toggleOffcanvas}
          className="transition duration-150 ease-in-out"
          type="button"
        >
          <i className="fa-solid fa-bars text-2xl text-white"></i>
        </button>
      </nav>

      <div
        className={`${
          offcanvas ? "translate-x-0" : "translate-x-full"
        } fixed bottom-0 right-0 top-0 z-20 flex w-3/4 h-5/6 min-h-[660px] rounded-l-3xl max-w-full flex-col border-none bg-tertiaryColor shadow-2xl outline-none transition duration-300 ease-in-out justify-between pt-10 pb-16 px-6`}
      >
        <button
          onClick={toggleOffcanvas}
          type="button"
          className="block ml-[85%]"
        >
          <i className="fa-solid fa-xmark text-white text-4xl"></i>
        </button>

        <ul className="text-white flex flex-col gap-14 text-2xl">
          <li>
            <Link
              to={userToken ? "/profile" : "/login"}
              onClick={toggleOffcanvas}
            >
              Mi perfil
            </Link>
          </li>
          <li>
            <Link to="/lost-pets" onClick={toggleOffcanvas}>
              Mascotas perdidas cerca
            </Link>
          </li>
          <li>
            <Link
              to={userToken ? "/publish-pet" : "/login"}
              onClick={toggleOffcanvas}
            >
              Reportar mascota perdida
            </Link>
          </li>
          <li>
            <Link
              to={userToken ? "/published-pets" : "/login"}
              onClick={toggleOffcanvas}
            >
              Mis mascotas reportadas
            </Link>
          </li>
        </ul>

        {userProfileInfo ? (
          <p className="text-white text-md text-center">
            {userProfileInfo.email}
            <Link
              to="/"
              onClick={handleLogOut}
              className="text-primaryColor underline block mx-auto"
            >
              Cerrar sesión
            </Link>
          </p>
        ) : (
          <p className="text-white text-md text-center">
            ¿Todavía no iniciaste sesión? Hacelo{" "}
            <Link
              to="/login"
              onClick={toggleOffcanvas}
              className="text-primaryColor underline"
            >
              acá
            </Link>
          </p>
        )}
      </div>
    </header>
  );
}
