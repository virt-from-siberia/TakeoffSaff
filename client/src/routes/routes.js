//
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
//
import User from "@/pages/User/UserContainer";
import Rgistration from "@/pages/Auth/RgistrationContainer";
import Login from "@/pages/Auth/LogInContainer";
import Home from "@/pages/Home/Home";

//isAuthenticated : boolean.
export const useRoutes = (isAuthenticated) => {
    //Если пользователь зарегестрирован или находится в системе
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/user' exact>
                    <User />
                </Route>
                <Redirect to='/user' />
            </Switch>
        );
    }
    //Если пользователь НЕ зарегестрирован
    return (
        <Switch>
            <Route path='/registration' exact>
                <Rgistration />
            </Route>
            <Route path='/login' exact>
                <Login />
            </Route>
            <Route path='/' exact>
                <Home />
            </Route>
            <Redirect to='/' />
        </Switch>
    );
};

export default useRoutes;
