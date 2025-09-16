import { createContext, useContext, useReducer, useEffect } from "react";
import API from "../api";

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, userInfo: action.payload, isAuthenticated: true, loading: false };
    case "LOGOUT":
      return { ...state, userInfo: null, isAuthenticated: false, loading: false };
    case "REGISTER":
      return { ...state, userInfo: action.payload, isAuthenticated: true, loading: false };
    case "UPDATE_PROFILE":
      return { ...state, userInfo: action.payload, loading: false };
    case "SET_LOADING":
      return { ...state, loading: true };
    case "AUTH_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const initialState = {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
    isAuthenticated: !!localStorage.getItem("userInfo"),
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // ✅ Sync localStorage
  useEffect(() => {
    if (state.userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    } else {
      localStorage.removeItem("userInfo");
    }
  }, [state.userInfo]);

  // ✅ Login
  const login = async (email, password) => {
    try {
      dispatch({ type: "SET_LOADING" });
      const { data } = await API.post("/users/login", { email, password });

      // 👉 Ensure name + token always present
      const userData = {
        _id: data._id,
        name: data.name || "User",
        email: data.email,
        isAdmin: data.isAdmin,
        token: data.token,
      };

      dispatch({ type: "LOGIN", payload: userData });
      return userData;
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      dispatch({ type: "AUTH_ERROR", payload: message });
      throw new Error(message);
    }
  };

  // ✅ Register
  const register = async (name, email, password) => {
    try {
      dispatch({ type: "SET_LOADING" });
      const { data } = await API.post("/users", { name, email, password });
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      dispatch({ type: "AUTH_ERROR", payload: message });
      throw new Error(message);
    }
  };

  // ✅ Verify OTP
  const verifyEmail = async (email, code) => {
    try {
      dispatch({ type: "SET_LOADING" });
      const { data } = await API.post("/users/verify", { email, code });

      const userData = {
        _id: data._id,
        name: data.name || "User",
        email: data.email,
        isAdmin: data.isAdmin,
        token: data.token,
      };

      dispatch({ type: "REGISTER", payload: userData });
      return userData;
    } catch (error) {
      const message = error.response?.data?.message || "Verification failed";
      dispatch({ type: "AUTH_ERROR", payload: message });
      throw new Error(message);
    }
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    dispatch({ type: "LOGOUT" });
  };

  const updateProfile = async (userData) => {
    try {
      dispatch({ type: "SET_LOADING" });
      const { data } = await API.put("/users/profile", userData, {
        headers: { Authorization: `Bearer ${state.userInfo.token}` },
      });

      const updated = { ...data, token: state.userInfo.token };
      dispatch({ type: "UPDATE_PROFILE", payload: updated });
      return updated;
    } catch (error) {
      const message = error.response?.data?.message || "Profile update failed";
      dispatch({ type: "AUTH_ERROR", payload: message });
      throw new Error(message);
    }
  };

  const clearError = () => dispatch({ type: "CLEAR_ERROR" });

  return (
    <AuthContext.Provider
      value={{
        userInfo: state.userInfo,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        login,
        register,
        verifyEmail,
        logout,
        updateProfile,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
