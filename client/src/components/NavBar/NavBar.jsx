import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
//
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PageviewIcon from "@material-ui/icons/Pageview";
//
import { AuthContext } from "@/context/AuthContext";
import "./NavBar.scss";

const NavBar = ({ serachPanel, onSearchHandler, inputValue }) => {
    const auth = useContext(AuthContext);

    const history = useHistory();

    const logoutHandler = (evt) => {
        console.log("work");
        auth.logout();
        history.push("/login");
    };

    const createHandler = () => {
        history.push(`/create`);
    };

    return (
        <div className='navBar'>
            <div className='navBar__logo'>
                <p className='navBar__logo-text'>contacts</p>
            </div>
            <div className='navBar__handler'>
                <div className='navBar__handler-inputBlock'>
                    {serachPanel ? (
                        <>
                            <div
                                className='add-contact'
                                onClick={createHandler}
                            >
                                <PersonAddIcon />
                                <p>Создать контакт</p>
                            </div>

                            <PageviewIcon />
                            <input
                                type='text'
                                onChange={(evt) =>
                                    onSearchHandler(evt.target.value)
                                }
                                value={inputValue}
                            />
                        </>
                    ) : null}
                </div>
                <div className='navBar__handler-out'>
                    <ExitToAppOutlinedIcon
                        className='exit'
                        onClick={logoutHandler}
                    />
                </div>
            </div>
        </div>
    );
};

export default NavBar;
