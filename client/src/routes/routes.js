//
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
//
import User from "@/pages/User/UserContainer";
import Rgistration from "@/pages/Auth/RgistrationContainer";
import Login from "@/pages/Auth/LogInContainer";
import CreateContact from "@/pages/CreateContact/CreateContactContainer";
import EditContact from "@/pages/EditContact/EditContactContainer";

//isAuthenticated : boolean.
export const useRoutes = (isAuthenticated) => {
    //Если пользователь зарегестрирован или находится в системе
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/user' exact>
                    <User />
                </Route>
                <Route path='/create' exact>
                    <CreateContact />
                </Route>
                <Route path='/edit/:id' exact>
                    <EditContact />
                </Route>
                <Redirect to='/user' />
            </Switch>
        );
    }
    //Если пользователь НЕ зарегестрирован
    return (
        <Switch>
            <Route path='/' exact>
                <Rgistration />
            </Route>
            <Route path='/login' exact>
                <Login />
            </Route>
            <Redirect to='/' />
        </Switch>
    );
};

export default useRoutes;
