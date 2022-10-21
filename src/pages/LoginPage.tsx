import React, { FC, useState } from "react";
import { Card, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginForm from "../components/LoginForm";
import { LoginFormProps } from "../components/LoginForm/LoginForm.types";
import service from "../services/instance";
export type LoginPageProps = {
  onSuccess: (token: string) => void;
};
const LoginPage: FC<LoginPageProps> = (props) => {
  const navigate = useNavigate();
  const handleLogin: LoginFormProps["onLogin"] = (values) => {
    service
      .post("auth/login", values)
      .then(({ data }) => {
        props.onSuccess?.(data.token);
        navigate("/boards");
      })
      .catch((error) => {
        toast.error("Bilgilerinizi kontrol ediniz.");
      });
  };
  return (
    <Row className="pt-5 justify-content-center">
      <Card className="p-3" style={{ width: "22rem" }}>
        <LoginForm onLogin={handleLogin} />
      </Card>
    </Row>
  );
};

export default LoginPage;
