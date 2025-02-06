/**
 * @file auth.tsx
 * @description This file contains the implementation of the authentication context and provider for the application.
 * It provides the necessary context and functions for handling user authentication, including login and logout functionality.
 * It also includes a protected route component to restrict access to authenticated users only.
 */

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { createContext } from "react";
import { ReactNode } from "react";
import useAuth from "../hooks/useAuth";
import NavigationBar from "../components/navigationBar";
import {
  UpdateUserProfileProp,
  UserProp,
  UserResponseProp,
} from "../proptypes/UserProp";
import { login, profileSet, register } from "../services/apiCaller/authClient";
import { MyErrorResponse, MyResponse } from "../proptypes/ResponseProp";
import { EventProvider } from "./event";
import useProfile from "../hooks/useProfile";

/**
 * @interface AuthContextType
 * @description Defines the shape of the authentication context.
 * @property {any | null} token - The authentication token of the user.
 * @property {string | null} role - The role of the authenticated user.
 * @property {(username: string, password: string) => Promise<void>} onLogin - Function to handle user login.
 * @property {() => void} onLogout - Function to handle user logout.
 */
interface AuthContextType {
  token: string | null;
  role: string | null;
  username: string;
  userId: number;
  onLogin: (
    username: string,
    password: string
  ) => Promise<UserResponseProp | MyErrorResponse>;
  onLogout: () => void;
  onRegister: (user: UserProp) => Promise<MyResponse>;
  updateProfileSet: (
    username: string,
    userProfile: UpdateUserProfileProp
  ) => Promise<MyResponse>;
}

/**
 * @interface jwtPayload
 * @description Defines the shape of the JWT payload.
 * @property {Array<{ id: string; name: string }>} roles - The roles of the authenticated user.
 */
interface jwtPayload {
  exp: number;
  user: {
    authorities: [{ authority: string }];
    username: string;
    id: number;
    profileSet: boolean;
    profileID: number;
  };
}

/**
 * @constant AuthContext
 * @description The authentication context to be used by the application.
 */
const AuthContext = createContext<AuthContextType>({
  token: "",
  role: null,
  username: "",
  userId: 0,
  onLogin: async () =>
    Promise.resolve({
      status_code: 500,
      data: {
        username: "",
        email: "",
        profileSet: false,
        roles: [],
      },
    }),
  onLogout: () => {},
  onRegister: () =>
    Promise.resolve({
      status_code: 500,
      data: "Initial response data",
    }),
  updateProfileSet: async () =>
    Promise.resolve({
      status_code: 500,
      data: "Initial response data",
    }),
});

/**
 *
 * @component AuthProvider
 * @description The provider component for the authentication context.
 * It manages the authentication state and provides the necessary functions for login and logout.
 * @param {ReactNode} children - The child components that will have access to the authentication context.
 */
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getProfileOnStartup } = useProfile();
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [userId, setUserId] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = localStorage.getItem("token");
      const storedRole = localStorage.getItem("role");

      if (storedToken && storedRole) {
        setToken(storedToken);
        const { user, exp } = jwtDecode(storedToken) as jwtPayload;
        setUsername(user.username);
        setUserId(user.id);
        const tokenDate = new Date(1000 * exp);
        const timestamp = new Date();
        console.log(user);
        await getProfileOnStartup(user.profileID);

        if (tokenDate < timestamp) {
          handleLogout();
        } else if (user.authorities.length > 0) {
          setRole(user.authorities[0].authority);
        }
        navigate(location.pathname || "/");
      }
    };

    fetchData();
  }, []);

  /**
   * @function handleLogin
   * @description Handles the user login process.
   * It sends the login request to the server and stores the authentication token and user role in local storage.
   * @param {string} username - The username of the user.
   * @param {string} password - The password of the user.
   */
  const handleLogin = async (
    username: string,
    password: string
  ): Promise<UserResponseProp | MyErrorResponse> => {
    const res = await login(username, password);
    if (res.status == 200) {
      if (!res.data.token || !res.data.roles) {
        return {
          error: true,
          status_code: 401,
          data: "Invalid token or roles",
        };
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.roles[0]);
      await getProfileOnStartup(res.data.profileID);
      setUserId(res.data.id);
      setToken(res.data.token);
      setRole(res.data.roles[0]);
      return {
        status_code: res.status,
        data: res.data,
      };
    } else {
      return {
        status_code: res.status,
        data: res.data.message,
      };
    }
  };

  /**
   * @function handleLogout
   * @description Handles the user logout process.
   * It removes the authentication token and user role from local storage and resets the authentication state.
   */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
    setUserId(0);
    setUsername("");
    navigate("/login");
  };

  const handleRegister = async (user: UserProp) => {
    const res = await register(user);

    console.log(res);
    return {
      status: res.data.status,
      status_code: res.status,
      data: res.data.message,
    };
  };

  const updateProfileSet = async (
    username: string,
    boolean: UpdateUserProfileProp
  ) => {
    const res = await profileSet(username, boolean);

    return {
      status: res.data.status,
      status_code: res.data.status,
      data: res.data.message,
    };
  };

  const value = {
    token,
    role,
    username,
    userId,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister,
    updateProfileSet,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * @component ProtectedRoute
 * @description A component that restricts access to its children to authenticated users only.
 * If the user is not authenticated, it redirects them to the login page.
 * @param {ReactNode} children - The child components that will be rendered if the user is authenticated.
 */
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to={"/login"} replace state={{ from: location }} />;
  }

  return (
    <>
      <EventProvider>
        {children}
        <NavigationBar />
      </EventProvider>
    </>
  );
};

export { AuthProvider, AuthContext, ProtectedRoute };
