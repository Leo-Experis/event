import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import RegsiterPage from "./pages/registerPage";
import NavigationBar from "./components/navigationBar";
import MyEventPage from "./pages/authed/myEventPage";
import MainPage from "./pages/authed/mainPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MyEventPage />} />
        <Route path="/search" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegsiterPage />} />
      </Routes>
      <NavigationBar />
    </>
  );
}

export default App;
