import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage/loginPage";

function App() {
  return (
    <>
      <div className="body">
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
