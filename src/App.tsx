import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import RegsiterPage from "./pages/register/registerPage";
import MyEventPage from "./pages/authed/myEventPage";
import MainPage from "./pages/authed/mainPage";
import { AuthProvider, ProtectedRoute } from "./context/auth";
import PageNotFound from "./pages/pageNotFound";
import { ProfileProvider } from "./context/profile";
import SetupAccount from "./pages/register/setupAccount";
import ProfilePicturePage from "./pages/register/profilePicturePage";
import CreateEventPage from "./pages/authed/createEventPage";
function App() {
  return (
    <>
      <ProfileProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegsiterPage />} />
            <Route path="/setupAccount" element={<SetupAccount />} />
            <Route path="/addProfilePicture" element={<ProfilePicturePage />} />
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

            <Route
              path="/createEvent"
              element={
                <ProtectedRoute>
                  <CreateEventPage />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AuthProvider>
      </ProfileProvider>
    </>
  );
}

export default App;
