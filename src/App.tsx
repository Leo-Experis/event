import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import RegsiterPage from "./pages/registerPage";
import MyEventPage from "./pages/authed/myEventPage";
import MainPage from "./pages/authed/mainPage";
import { AuthProvider, ProtectedRoute } from "./context/auth";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegsiterPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MyEventPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
