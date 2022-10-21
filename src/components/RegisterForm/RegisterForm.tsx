import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Row, Form, FloatingLabel, Button } from "react-bootstrap";
import {
  RegisterFormProps,
  RegisterFormValuesProps,
} from "./RegisterForm.types";
import { useFormik } from "formik";
import * as Yup from "yup";

const RegisterForm: FC<RegisterFormProps> = (props) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirm: "",
    } as RegisterFormValuesProps,
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "En az 3 karakter girmelisiniz.")
        .required("Bu alan boş geçilemez."),
      password: Yup.string()
        .min(3, "En az 3 karakter girmelisiniz.")
        .required("Bu alan boş geçilemez."),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password"), null], "Şifreler uyuşmuyor")
        .required("Bu alan boş geçilemez."),
    }),
    onSubmit: (values) => {
      props.onRegister?.(values);
    },
  });

  return (
    <>
      <Row className="justify-content-center text-center my-3">
        <div className="icon_box justify-content-center mb-3">
          <i className="fa-solid fa-user-plus"></i>
        </div>
        <h4>Kanban App</h4>
        <h6>Kayıt Formu</h6>
      </Row>
      <Row>
        <form onSubmit={formik.handleSubmit}>
          <FloatingLabel label="Kullanıcı adı" className="mb-3">
            <Form.Control
              id="username"
              name="username"
              type="text"
              placeholder="Kullanıcı adı"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div style={{ color: "red" }}>
                <small>{formik.errors.username}</small>
              </div>
            ) : null}
          </FloatingLabel>

          <FloatingLabel label="Şifre" className="mb-3">
            <Form.Control
              id="password"
              name="password"
              type="password"
              placeholder="Şifre"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: "red" }}>
                <small>{formik.errors.password}</small>
              </div>
            ) : null}
          </FloatingLabel>

          <FloatingLabel label="Şifre Tekrar" className="mb-3">
            <Form.Control
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              placeholder="Şifre Tekrar"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.passwordConfirm}
            />
            {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
              <div style={{ color: "red" }}>
                <small>{formik.errors.passwordConfirm}</small>
              </div>
            ) : null}
          </FloatingLabel>
          <Button className="w-100 mb-3" variant="dark" type="submit">
            Kayıt Ol
          </Button>
        </form>
      </Row>
      <Row className="text-center mb-3">
        <small>
          Zaten bir hesabım var mı? <Link to="/login">Giriş Yap!</Link>
        </small>
      </Row>
    </>
  );
};

export default RegisterForm;
