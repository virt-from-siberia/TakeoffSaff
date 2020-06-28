//
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
//
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";

//
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

// const auth = useContext(AuthContext);

const Login = ({
    values,
    handleChange,
    errors,
    touched,
    isLoading,
    successLogin,
    showNotify,
    auth,
    token,
    userId,
    errorLoginMessage,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (successLogin) {
            auth.login(token, userId);
        }
    }, [token, auth, userId, successLogin]);

    return (
        <div className='auth'>
            <div className='auth__block'>
                <div className='auth__block__content'>
                    <div className='registartion'>
                        <h2>Вход в систему</h2>
                        {showNotify && showNotify === "success" ? (
                            <Alert variant='filled' severity='success'>
                                Вход успешно
                            </Alert>
                        ) : null}
                        {showNotify && showNotify === "fail" ? (
                            <Alert variant='filled' severity='error'>
                                {errorLoginMessage && errorLoginMessage}
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
                                    {touched.password && errors.password && (
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
                            {isLoading ? (
                                <div className='spinner '>
                                    <CircularProgress />
                                </div>
                            ) : null}

                            <button
                                className='btn btn-login'
                                disabled={isLoading ? true : false}
                            >
                                Вход
                            </button>
                        </Form>
                    </div>
                    <Link className='log-change' to='/registration'>
                        <AssignmentIndIcon /> Регистрация
                    </Link>
                </div>
            </div>
        </div>
    );
};

const FormikApp = withFormik({
    mapPropsToValues({ email, password }) {
        return {
            email: email || "",
            password: password || "",
        };
    },
    validationSchema: yup.object().shape({
        email: yup
            .string()
            .email("Введите валидный Email")
            .required("Введите Email"),
        password: yup
            .string()
            .min(8, "Пароль не должен быть менее 8 символов")
            .required("Введиет пароль"),
    }),

    handleSubmit(values, { props }) {
        props.actionUserLogin(
            values.email.toLowerCase(),
            values.password.toLowerCase()
        );
    },
})(Login);

Login.propTypes = {
    values: PropTypes.any.isRequired,
    handleChange: PropTypes.func.isRequired,
    errors: PropTypes.any.isRequired,
    touched: PropTypes.any.isRequired,
    isLoading: PropTypes.bool.isRequired,
    successLogin: PropTypes.bool.isRequired,
    showNotify: PropTypes.any.isRequired,
    auth: PropTypes.any.isRequired,
    token: PropTypes.any.isRequired,
    userId: PropTypes.string.isRequired,
};

export default FormikApp;
