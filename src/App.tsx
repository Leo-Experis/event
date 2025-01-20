import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import RegsiterPage from "./pages/registerPage";
import MainPage from "./pages/authed/mainPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegsiterPage />} />
      </Routes>
    </>
  );
}

export default App;
