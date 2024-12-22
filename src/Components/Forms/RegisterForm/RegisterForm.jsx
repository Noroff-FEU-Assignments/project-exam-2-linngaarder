import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import createAxios from "../../../Functions/CreateAxios";
import AuthContext from "../../../Context/AuthContext";
import { loginUrl, registerUrl } from "../../../Constants/Apis";
import DisplayResponseErrors from "../../Messages/DisplayResponseError";
import InputError from "../../Messages/InputError";
import { useNavigate } from "react-router-dom";
import BootstrapForm from "../BootStrapForm/BootstrapForm";
import PrimaryButton from "../../Buttons/PrimaryBtn";

const schema = yup.object().shape({
  username: yup.string().required("Enter username"),
  email: yup
    .string()
    .email("Please enter valid email")
    .matches(
      /^[a-zA-Z]+[a-zA-Z0-9_.]+@+(\bnoroff|\bstud.noroff).+n+o$/,
      "Please enter Noroff email"
    )
    .required("Enter email"),
  password: yup
    .string()
    .required("Enter password")
    .min(8, "Password must be at least 8 characters"),
});

function RegisterForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useContext(AuthContext);
  const [disabled, setDisabled] = useState(false);
  const [responseError, setResponseError] = useState(null);
  const navigate = useNavigate();

  async function onSubmit(data) {
    setDisabled(true);
    setResponseError(null);
    const userData = {
      name: data.username,
      email: data.email,
      password: data.password,
    };

    try {
      const client = createAxios();
      const response = await client.post(registerUrl, userData);
      if (response.status === 201) {
        const loginResponse = await client.post(loginUrl, {
          email: userData.email,
          password: userData.password,
        });
        if (loginResponse.status === 200) {
          setAuth(loginResponse.data);
          navigate("/home");
        }
      }
    } catch (error) {
      console.error(error.response.data.errors);
      setResponseError(error.response.data.errors);
    } finally {
      setDisabled(false);
    }
  }
  return (
    <BootstrapForm onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={disabled} className="p-3 radius-md">
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            id="username"
            placeholder="Username"
            {...register("username")}
            className="mb-1"
          />
          {errors.username && (
            <InputError>{errors.username.message}</InputError>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            id="email"
            placeholder="@stud.noroff.no"
            {...register("email")}
            className="mb-1"
          />
          {errors.email && <InputError>{errors.email.message}</InputError>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            id="password"
            placeholder="Password"
            {...register("password")}
            className="mb-1"
          />
          {errors.password && (
            <InputError>{errors.password.message}</InputError>
          )}
        </Form.Group>
        {responseError && <DisplayResponseErrors data={responseError} />}
        <div className="flex-r full-width justify-end">
          <PrimaryButton type="submit">Submit</PrimaryButton>
        </div>
      </fieldset>
    </BootstrapForm>
  );
}

export default RegisterForm;
