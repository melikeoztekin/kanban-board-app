import React from "react";
import { Card, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RegisterForm from "../components/RegisterForm";
import { RegisterFormProps } from "../components/RegisterForm/RegisterForm.types";
import service from "../services/instance";

const RegisterPage = () => {
  const navigate = useNavigate();
  const handleRegister: RegisterFormProps["onRegister"] = (values) => {
    service
      .post("auth/register", values)
      .then(() => {
        toast.success("Kayıt başarılı.");
        navigate("/login");
      })
      .catch((error) => {
        error.response.status === 401
          ? toast.error("Kullanıcı zaten mevcut.")
          : toast.warning("Bilgileri kontrol ediniz.");
      });
  };
  return (
    <Row className="pt-5 justify-content-center">
      <Card className="p-3" style={{ width: "22rem" }}>
        <RegisterForm onRegister={handleRegister} />
      </Card>
    </Row>
  );
};

export default RegisterPage;
