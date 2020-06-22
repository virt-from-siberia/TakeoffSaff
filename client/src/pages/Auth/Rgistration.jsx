//
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
//
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";
import MaskedInput from "react-text-mask";
//
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

const Rgistration = ({
    values,
    handleChange,
    errors,
    touched,
    isLoading,
    showNotify,
    successRegistration,
    errorRegistrationMessage,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (successRegistration) {
            setTimeout(() => {
                history.push("/login");
            }, 3500);
        }
    }, [history, successRegistration]);

    useEffect(() => {
        if (errorRegistrationMessage) {
            console.log(
                " -> errorRegistrationMessage ",
                errorRegistrationMessage
            );
        }
    }, [errorRegistrationMessage]);

    const SuccessRegistartion = () => {
        return (
            <div className='block-sucess'>
                <div className='block-sucess-body'>
                    <p>
                        На ваш Email <br />
                        <span> {values.email && values.email}</span> <br />
                        было отправлено письмо со ссылкой активации
                    </p>
                </div>
            </div>
        );
    };

    const phoneNumberMask = [
        /\d/,
        "(",
        /[1-9]/,
        /\d/,
        /\d/,
        ")",
        "-",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
    ];

    return (
        <div className='auth'>
            <div className='auth__block'>
                {successRegistration ? (
                    <SuccessRegistartion />
                ) : (
                    <div className='auth__block__content'>
                        <div className='registartion'>
                            <h2>Регистрация пользователя</h2>
                            {showNotify && showNotify === "success" ? (
                                <Alert variant='filled' severity='success'>
                                    Регистрация успешно
                                </Alert>
                            ) : null}
                            {showNotify && showNotify === "fail" ? (
                                <Alert variant='filled' severity='error'>
                                    {errorRegistrationMessage &&
                                        errorRegistrationMessage}
                                </Alert>
                            ) : null}

                            <Form className='registartion__forms'>
                                <div>
                                    <div className='error'>
                                        {touched.email && errors.email && (
                                            <p>{errors.email}</p>
                                        )}
                                    </div>

                                    <Field
                                        type='email'
                                        name='email'
                                        autoComplete='off'
                                        placeholder='Email'
                                        spellCheck='false'
                                        value={values.email.trim()}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <div className='error'>
                                        {touched.phone && errors.phone && (
                                            <p>{errors.phone}</p>
                                        )}
                                    </div>

                                    <Field
                                        name='phone'
                                        autoComplete='off'
                                        values={values.phone}
                                        render={() => (
                                            <MaskedInput
                                                keepCharPositions={false}
                                                mask={phoneNumberMask}
                                                values={values.phone.trim()}
                                                placeholder='Телефон'
                                                type='text'
                                                name='phone'
                                                onChange={handleChange}
                                                autoComplete='off'
                                                guide={false}
                                            />
                                        )}
                                    />
                                </div>

                                <div>
                                    <div className='error'>
                                        {touched.password &&
                                            errors.password && (
                                                <p>{errors.password}</p>
                                            )}
                                    </div>
                                    <div>
                                        <Field
                                            type={
                                                (showPassword && "text") ||
                                                "password"
                                            }
                                            name='password'
                                            autoComplete='off'
                                            placeholder='Пароль'
                                            spellCheck='false'
                                            value={values.password.trim()}
                                        />

                                        <div
                                            className='show-password'
                                            onMouseEnter={() =>
                                                setShowPassword(true)
                                            }
                                            onMouseLeave={() =>
                                                setShowPassword(false)
                                            }
                                        >
                                            {(!showPassword && (
                                                <VisibilityOffIcon />
                                            )) || <VisibilityIcon />}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='error'>
                                        {touched.passwordConfirmation &&
                                            errors.passwordConfirmation && (
                                                <p>Пароли не совпадают</p>
                                            )}
                                    </div>
                                    <div>
                                        <Field
                                            type={
                                                (showPassword && "text") ||
                                                "password"
                                            }
                                            name='passwordConfirmation'
                                            autoComplete='off'
                                            placeholder='Подтверждение пароля'
                                            spellCheck='false'
                                            onChange={handleChange}
                                            value={values.passwordConfirmation.trim()}
                                        />
                                        <div
                                            className='show-password'
                                            onMouseEnter={() =>
                                                setShowPassword(true)
                                            }
                                            onMouseLeave={() =>
                                                setShowPassword(false)
                                            }
                                        >
                                            {(!showPassword && (
                                                <VisibilityOffIcon />
                                            )) || <VisibilityIcon />}
                                        </div>
                                    </div>
                                </div>
                                {isLoading ? (
                                    <div className='spinner '>
                                        <CircularProgress />
                                    </div>
                                ) : null}
                                <button
                                    className='btn btn-register'
                                    disabled={isLoading ? true : false}
                                >
                                    Регистрация
                                </button>
                            </Form>
                        </div>

                        <Link className='log-change' to='/login'>
                            <ExitToAppIcon /> Вход
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

const FormikApp = withFormik({
    mapPropsToValues({ email, password, passwordConfirmation, phone }) {
        return {
            email: email || "",
            password: password || "",
            passwordConfirmation: passwordConfirmation || "",
            phone: phone || "",
        };
    },
    validationSchema: yup.object().shape({
        email: yup
            .string()
            .email("Введите валидный Email")
            .required("Введите Email"),
        phone: yup
            .string()
            .min(15, "Введите полный номер")
            .required("Введите номер телефона"),
        password: yup
            .string()
            .min(8, "Пароль не должен быть менее 8 символов")
            .required("Введиет пароль"),
        passwordConfirmation: yup
            .string()
            //должен совпадать с паролем
            .oneOf([yup.ref("password"), null])
            .required("Подтвердите пароль"),
    }),

    handleSubmit(values, { props }) {
        props.actionUserRegistration(
            values.email,
            values.password,
            values.phone
        );
    },
})(Rgistration);

Rgistration.propTypes = {
    values: PropTypes.any.isRequired,
    handleChange: PropTypes.func.isRequired,
    errors: PropTypes.any.isRequired,
    touched: PropTypes.any.isRequired,
    isLoading: PropTypes.bool.isRequired,
    showNotify: PropTypes.any.isRequired,
    successRegistration: PropTypes.bool.isRequired,
    errorRegistrationMessage: PropTypes.string.isRequired,
};

export default FormikApp;
