import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import BootstrapForm from "../BootStrapForm/BootstrapForm";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import createAxios from "../../../Functions/CreateAxios";
import AuthContext from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginUrl } from "../../../Constants/Apis";
import InputError from "../../Messages/InputError";
import PrimaryButton from "../../Buttons/PrimaryBtn";
import Message from "../../Messages/Message";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Enter an email"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Enter a password"),
});

function LoginForm() {
  //eslint-disable-next-line
  const [auth, setAuth] = useContext(AuthContext);
  const [disabled, setDisabled] = useState(false);
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setDisabled(true);

    try {
      const client = createAxios();
      const response = await client.post(loginUrl, data);
      if (response.status === 200) {
        setAuth(response.data);
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      setFormError(error);
    } finally {
      setDisabled(false);
    }
  }

  return (
    <BootstrapForm
      onSubmit={handleSubmit(onSubmit)}
      className="flex-col full-width standard-component-width"
    >
      <fieldset disabled={disabled} className="p-3 radius-md">
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            id="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && <InputError>{errors.email.message}</InputError>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            id="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <InputError>{errors.password.message}</InputError>
          )}
        </Form.Group>
        <div className="flex-r full-width justify-end">
          <PrimaryButton type="submit">Log In</PrimaryButton>
        </div>
        {formError && <Message type="error">{formError.toString()}</Message>}
      </fieldset>
    </BootstrapForm>
  );
}

export default LoginForm;
