import { Outlet } from "react-router-dom";
import AppNavbar from "../src/components/AppNavBar/AppNavBar";
import Footer from "./components/Footer/Footer";
import { useDispatch } from "react-redux";
import {
  setToken,
  authenticateUser,
} from "./api/authenticationService/AuthSlice";
import { AppDispatch } from "./Service/statemanagement/store";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const token = localStorage.getItem("token");
  if (token) {
    dispatch(setToken(token));
    dispatch(authenticateUser(true));
  }
  return (
    <>
      <AppNavbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
