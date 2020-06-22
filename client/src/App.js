//external
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
//internal
import { useRoutes } from "./routes/routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import Loader from "./components/Loader/Loader";
//styles
import "@/styles/index.scss";

function App() {
    const { token, login, logout, userId, ready } = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);

    if (!ready) {
        return <Loader />;
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                login,
                logout,
                userId,
                isAuthenticated,
            }}
        >
            <Router>{routes}</Router>
        </AuthContext.Provider>
    );
}

export default App;
