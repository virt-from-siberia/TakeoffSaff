import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
//
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import TextField from "@material-ui/core/TextField";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import Brightness1OutlinedIcon from "@material-ui/icons/Brightness1Outlined";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
//
import NavBar from "@/components/NavBar/NavBar";
import "./CreateContact.scss";

export const CreateContact = ({
    actionFetchCreateContact,
    isLoading,
    success,
}) => {
    const history = useHistory();

    // const redirectUser = useCallback(() => {
    //     history.push("/user");
    // }, [history]);

    useEffect(() => {
        if (success) {
            history.push("/user");
        }
    }, [success, history]);

    const [contact, setContact] = useState({
        name: "",
        secondName: "",
        email: "",
        website: "",
        address: "",
        phone: "",
        important: false,
        color: "",
    });

    const changeHandler = (evt) => {
        setContact({
            ...contact,
            [evt.target.name]: evt.target.value,
        });
    };

    const changeColor = (val) => {
        if (contact.color === val) {
            setContact({
                ...contact,
                color: "",
            });
        } else {
            setContact({
                ...contact,
                color: val,
            });
        }
    };

    const fetchHandler = () => {
        actionFetchCreateContact({
            ...contact,
        });
    };
    const Inputs = [
        {
            label: "Введите имя",
            type: "text",
            value: contact.name,
            name: "name",
        },
        {
            label: "Введите фамилию",
            type: "text",
            value: contact.secondName,
            name: "secondName",
        },
        {
            label: "Введите Emai",
            type: "email",
            value: contact.email,
            name: "email",
        },
        {
            label: "Введите Website",
            type: "text",
            value: contact.website,
            name: "website",
        },
        {
            label: "Введите Адресс",
            type: "text",
            value: contact.address,
            name: "address",
        },
        {
            label: "Введите Телефон",
            type: "text",
            value: contact.phone,
            name: "phone",
        },
    ].map((el, index) => {
        return (
            <TextField
                label={el.label}
                variant='outlined'
                type={el.type}
                name={el.name}
                onChange={changeHandler}
                value={el.value}
                autoComplete='off'
                key={index + 1}
                className='input-create'
            />
        );
    });

    return (
        <div className='createContact '>
            <NavBar serachPanel={false} />
            <div className='container'>
                <div className='createContact__body'>
                    <h1>Добавить контакт</h1>

                    <Button
                        className='btn-save'
                        onClick={fetchHandler}
                        disabled={isLoading}
                    >
                        Добавить
                    </Button>
                    <div className='createContact__body-inputs'>
                        <div className='set-attributes'>
                            <div
                                className='important-contact'
                                onClick={() =>
                                    setContact({
                                        ...contact,
                                        important: !contact.important,
                                    })
                                }
                            >
                                {contact.important ? (
                                    <StarIcon />
                                ) : (
                                    <StarBorderIcon />
                                )}
                                <p>Избранный</p>
                            </div>
                            <div className='set-color'>
                                <ColorLensIcon />

                                <div className='set-color-handler'>
                                    {contact.color === "red" ? (
                                        <Brightness1Icon
                                            className='red'
                                            onClick={() => changeColor("red")}
                                        />
                                    ) : (
                                        <Brightness1OutlinedIcon
                                            className='red'
                                            onClick={() => changeColor("red")}
                                        />
                                    )}

                                    {contact.color === "blue" ? (
                                        <Brightness1Icon
                                            className='blue'
                                            onClick={() => changeColor("blue")}
                                        />
                                    ) : (
                                        <Brightness1OutlinedIcon
                                            className='blue'
                                            onClick={() => changeColor("blue")}
                                        />
                                    )}

                                    {contact.color === "green" ? (
                                        <Brightness1Icon
                                            className='green'
                                            onClick={() => changeColor("green")}
                                        />
                                    ) : (
                                        <Brightness1OutlinedIcon
                                            className='green'
                                            onClick={() => changeColor("green")}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        {Inputs}
                    </div>
                    {isLoading ? <CircularProgress /> : null}
                </div>
            </div>
        </div>
    );
};

export default CreateContact;
