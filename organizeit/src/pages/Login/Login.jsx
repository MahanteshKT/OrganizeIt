import React, { useState } from 'react'
import Layout from '../../components/Layout/Root'
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import Input from '../../components/UI/Input/Input'
import classes from './Login.module.scss';
import loginPreference from '../../Preferences/Login/Login';
import Button from '../../components/UI/Button/Button';
import { loginApi } from '../../services/serviceApi';
function Login() {
    // const navigate = useNavigate();
    // const userSlice = useSelector((state) => state.user);
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const initialStateErrors   = {
        email: { required: false },
        password: { required: false },
        custom_error: null,
    };
    const [errors, setErrors] = useState(initialStateErrors);
    const [loading, setLoading] = useState(false);

    const onChangeInput = (e) => {
        e.preventDefault();
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
    function onHandleSubmit(e) {
        e.preventDefault();
        var hasError = false;
        var newErrors = {
            ...initialStateErrors
        }
        if (inputs.email === '') {
            newErrors.email.required = true;
            hasError = true;
        }
        if (inputs.password === '') {
            newErrors.password.required = true;
            hasError = true;
        }
        console.log(inputs, newErrors, hasError);
        if (!hasError) {
            loginApi(inputs).then((data) => {
                console.log(data);
            }).catch((error) => {
                console.log(error.message);
            }).finally(() => {
                console.log('finally')
            });
        }
        setErrors(newErrors);
    }
  return (
    <section
    className={`w-[100%] ${classes["register-block"]} gap-4 flex justify-center items-center mx-auto`}
  >
    <h2 className="mb-2 text-[1.5rem] text-blue-300 font-bold">
              { loginPreference.title }
    </h2>
    <div
      className={` shadow-lg shadow-blue-300  w-[90%] md:w-[60%] ${classes.container}`}
    >
      <div className="row ">
        <div className={`col ${classes["register-sec"]}`}>
          <h2 className="text-center"> Login Now </h2>{" "}
          <form
            onSubmit={onHandleSubmit}
            className="register-form flex flex-col gap-3"
            action=""
          >
            <div className="flex flex-col md:flex-row gap-3">
              <Input
                label="Email:"
                errors={'sdf'}
                className="w-full"
                attributes={{
                    type: "text",
                    onChange: onChangeInput,
                    name: "email",
                    id: "email",
                    value: inputs.email,
                    placeholder: "Email ",
                }}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <Input
                label="Password:"
                errors={errors.password}
                className="w-full"
                attributes={{
                type: "password",
                onChange: onChangeInput,
                name: "password",
                id: "password",
                value: inputs.password,
                placeholder: "Password ",
                }}
              />
            </div>

            <div className="form-group">
              <Button
                type="submit"
                className="btn btn-login float-right bg-slate-900 text-slate-200 hover:bg-slate-300 hover:text-slate-800 transition-lg rounded-lg px-3 py-2 text-center flex justify-center"
                disabled={loading}
              >
                { loginPreference.loginButton.text}
              </Button>

            </div>
            <div className="form-group">
                              { loginPreference.extText }
              <NavLink to="/register" className="text-blue-600 font-medium">
                {" "}
                { loginPreference.extRegister}{" "}
              </NavLink>{" "}
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Login