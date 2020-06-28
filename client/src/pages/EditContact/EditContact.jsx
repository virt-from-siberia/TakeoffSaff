import React, { useState, useCallback, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
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
import Loader from "@/components/Loader/Loader";
import "./EditContact.scss";

export const EditContact = ({
    actionDeleteEditContact,
    actionGetEditContact,
    actionChangeEditContact,
    isLoading,
    successEdit,
    deleteSuccess,
    contact,
    error,
}) => {
    const history = useHistory();

    const Id = useParams().id;

    const getContact = useCallback(() => {
        actionGetEditContact(Id);
    }, [actionGetEditContact, Id]);

    useEffect(() => {
        getContact(Id);
    }, [getContact, Id]);

    const [contactItems, setContactItems] = useState({
        name: "",
        secondName: "",
        email: "",
        website: "",
        address: "",
        phone: "",
        important: false,
        color: "",
        id: "",
    });

    useEffect(() => {
        setContactItems({
            name: contact.name,
            secondName: contact.secondName,
            email: contact.email,
            website: contact.website,
            address: contact.address,
            phone: contact.phone,
            important: contact.important,
            color: contact.color,
            id: contact._id,
        });
    }, [contact]);

    const fetchHandlerDelete = useCallback(() => {
        actionDeleteEditContact(Id);
    }, [actionDeleteEditContact, Id]);

    const redirectUser = useCallback(() => {
        history.push("/user");
    }, [history]);

    useEffect(() => {
        if (successEdit) {
            redirectUser();
        }
    }, [redirectUser, successEdit]);

    useEffect(() => {
        if (deleteSuccess) {
            redirectUser();
        }
    }, [redirectUser, deleteSuccess]);

    useEffect(() => {
        if (error) {
            history.push("/user");
        }
    }, [error, history]);

    const changeHandler = (evt) => {
        setContactItems({
            ...contactItems,
            [evt.target.name]: evt.target.value,
        });
    };

    const fetchHandlerEdit = () => {
        actionChangeEditContact(contactItems);
    };

    const changeColor = (val) => {
        if (contactItems.color === val) {
            setContactItems({
                ...contactItems,
                color: "",
            });
        } else {
            setContactItems({
                ...contactItems,
                color: val,
            });
        }
    };
    const Inputs = [
        {
            label: "Введите имя",
            type: "text",
            value: contactItems.name,
            name: "name",
        },
        {
            label: "Введите фамилию",
            type: "text",
            value: contactItems.secondName,
            name: "secondName",
        },
        {
            label: "Введите Emai",
            type: "email",
            value: contactItems.email,
            name: "email",
        },
        {
            label: "Введите Website",
            type: "text",
            value: contactItems.website,
            name: "website",
        },
        {
            label: "Введите Адресс",
            type: "text",
            value: contactItems.address,
            name: "address",
        },
        {
            label: "Введите Телефон",
            type: "text",
            value: contactItems.phone,
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
                {isLoading ? (
                    <Loader />
                ) : (
                    <div className='createContact__body'>
                        <h1>Изменить контакт</h1>

                        <Button
                            className='btn-edite'
                            onClick={fetchHandlerEdit}
                            disabled={isLoading}
                        >
                            Сохранить
                        </Button>
                        <Button
                            className='btn-delete'
                            onClick={fetchHandlerDelete}
                            disabled={isLoading}
                        >
                            Удалить
                        </Button>

                        <div className='createContact__body-inputs'>
                            <div className='set-attributes'>
                                <div
                                    className='important-contact'
                                    onClick={() =>
                                        setContactItems({
                                            ...contactItems,
                                            important: !contactItems.important,
                                        })
                                    }
                                >
                                    {contactItems.important ? (
                                        <StarIcon />
                                    ) : (
                                        <StarBorderIcon />
                                    )}
                                    <p>Избранный</p>
                                </div>
                                <div className='set-color'>
                                    <ColorLensIcon />

                                    <div className='set-color-handler'>
                                        {contactItems.color === "red" ? (
                                            <Brightness1Icon
                                                className='red'
                                                onClick={() =>
                                                    changeColor("red")
                                                }
                                            />
                                        ) : (
                                            <Brightness1OutlinedIcon
                                                className='red'
                                                onClick={() =>
                                                    changeColor("red")
                                                }
                                            />
                                        )}

                                        {contactItems.color === "blue" ? (
                                            <Brightness1Icon
                                                className='blue'
                                                onClick={() =>
                                                    changeColor("blue")
                                                }
                                            />
                                        ) : (
                                            <Brightness1OutlinedIcon
                                                className='blue'
                                                onClick={() =>
                                                    changeColor("blue")
                                                }
                                            />
                                        )}

                                        {contactItems.color === "green" ? (
                                            <Brightness1Icon
                                                className='green'
                                                onClick={() =>
                                                    changeColor("green")
                                                }
                                            />
                                        ) : (
                                            <Brightness1OutlinedIcon
                                                className='green'
                                                onClick={() =>
                                                    changeColor("green")
                                                }
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            {Inputs}
                        </div>
                        {isLoading ? <CircularProgress /> : null}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditContact;
