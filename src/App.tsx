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
import { EventProvider } from "./context/event";
import EventPage from "./pages/authed/eventPage";
function App() {
  return (
    <>
      <ProfileProvider>
        <EventProvider>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegsiterPage />} />
              <Route path="/setupAccount" element={<SetupAccount />} />
              <Route
                path="/addProfilePicture"
                element={<ProfilePicturePage />}
              />
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
              <Route
                path="/event/:eventID"
                element={
                  <ProtectedRoute>
                    <EventPage />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </AuthProvider>
        </EventProvider>
      </ProfileProvider>
    </>
  );
}

export default App;
