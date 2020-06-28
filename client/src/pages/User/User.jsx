//
import React, { useEffect, useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import orderBy from "lodash/orderBy";
//
import StarIcon from "@material-ui/icons/Star";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PhoneIcon from "@material-ui/icons/Phone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LanguageIcon from "@material-ui/icons/Language";
import BusinessIcon from "@material-ui/icons/Business";
import CreateIcon from "@material-ui/icons/Create";
//
import Loader from "@/components/Loader/Loader";
import NavBar from "@/components/NavBar/NavBar";
import { AuthContext } from "@/context/AuthContext";
import "./User.scss";

const User = ({
    actionGetUserContacts,
    isLoading,
    contacts,
    error,
    onSearchHandler,
    inputValue,
    takeGroupHandler,
}) => {
    const getUserContacts = useCallback(() => {
        actionGetUserContacts();
    }, [actionGetUserContacts]);

    const { token } = useContext(AuthContext);

    useEffect(() => {
        if (token) {
            getUserContacts();
        }
    }, [getUserContacts, token]);

    const history = useHistory();

    if (error) {
        return (
            <p>
                ERROR во время запроса произошла ошибка, попробуйте
                перезагрузиить страницу.
            </p>
        );
    }

    const eidtHandler = (id) => {
        history.push(`/edit/${id}`);
    };

    const Contact = orderBy(
        contacts,
        ["name", "fullname"],
        ["asc", "desc"]
    ).map((item) => (
        <div
            className='contacts__item'
            key={item._id}
            id={item._id}
            onClick={() => eidtHandler(item._id)}
        >
            <div className='contacts__item-body'>
                <div className='important'>
                    {item.important ? <StarIcon /> : null}
                </div>
                <div className='top'>
                    <div className='common-info'>
                        <div className='name'>
                            {item.color ? (
                                <AccountCircleIcon className={item.color} />
                            ) : (
                                <AccountCircleIcon />
                            )}
                            <p>{item.name}</p>
                            &nbsp;&nbsp;&nbsp;
                            <p>{item.secondName}</p>
                        </div>
                        {item.phone ? (
                            <div className='phone'>
                                <PhoneIcon />
                                <p>{item.phone}</p>
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className='middle'>
                    <div className='common-info'>
                        {item.email ? (
                            <div className='email'>
                                <MailOutlineIcon />
                                <p>{item.email}</p>
                            </div>
                        ) : null}
                        {item.website ? (
                            <div className='website'>
                                <LanguageIcon />
                                <p>{item.website}</p>
                            </div>
                        ) : null}
                        {item.address ? (
                            <div className='address'>
                                <BusinessIcon />
                                <p>{item.address}</p>
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className='edit'>
                    <CreateIcon />
                </div>
            </div>
        </div>
    ));

    return (
        <div className='user '>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <NavBar
                        serachPanel={true}
                        onSearchHandler={onSearchHandler}
                        inputValue={inputValue}
                        takeGroupHandler={takeGroupHandler}
                    />

                    <div className='container'>
                        <div className='contacts'>{Contact}</div>
                    </div>
                </>
            )}
        </div>
    );
};

export default User;
