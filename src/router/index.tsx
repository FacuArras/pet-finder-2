import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import LogIn from "../pages/LogIn";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import PublishPet from "../pages/PublishPet";
import LostPets from "../pages/LostPets";
import PublishedPets from "../pages/PublishedPets";
import UpdatePets from "../pages/UpdatePets";

export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/" Component={Layout}>
        <Route index element={<Home />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/publish-pet" element={<PublishPet />}></Route>
        <Route path="/lost-pets" element={<LostPets />}></Route>
        <Route path="/published-pets" element={<PublishedPets />}></Route>
        <Route path="/published-pets/:petId" element={<UpdatePets />}></Route>
      </Route>
    </Routes>
  );
}
