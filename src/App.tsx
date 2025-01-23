import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import RegsiterPage from "./pages/registerPage";
import MyEventPage from "./pages/authed/myEventPage";
import MainPage from "./pages/authed/mainPage";
import { AuthProvider, ProtectedRoute } from "./context/auth";
import PageNotFound from "./pages/pageNotFound";
import { ProfileProvider } from "./context/profile";
import SetupAccount from "./pages/setupAccount";
function App() {
  return (
    <>
      <AuthProvider>
        <ProfileProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegsiterPage />} />
            <Route path="/setupAccount" element={<SetupAccount />} />

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

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </ProfileProvider>
      </AuthProvider>
    </>
  );
}

export default App;
