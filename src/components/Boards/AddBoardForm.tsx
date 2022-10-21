import React, { FC, useEffect, useState } from "react";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { BoardListAddProps, BoardListAddValuesProps } from "./BoardList.types";
import { useFormik } from "formik";
import * as Yup from "yup";
import jwt_decode from "jwt-decode";

const AddBoardForm: FC<BoardListAddProps> = (props) => {
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token !== null) {
      let decode: any = jwt_decode(token);
      setUserId(decode.id);
    }
    return () => {};
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      ownerId: userId,
    } as BoardListAddValuesProps,
    validationSchema: Yup.object({
      title: Yup.string().required("Bu alan boş geçilemez."),
      ownerId: Yup.number().required("Bu alan boş geçilemez."),
    }),
    onSubmit: (values) => {
      values.ownerId = userId;
      props.onBoardListAdd?.(values);
      values.title = "";
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Yeni Board Ekle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FloatingLabel label="Board adı" className="mb-3">
            <Form.Control
              id="title"
              name="title"
              type="text"
              placeholder="Board adı"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title ? (
              <div style={{ color: "red" }}>
                <small>{formik.errors.title}</small>
              </div>
            ) : null}
          </FloatingLabel>
          <Button
            variant="outline-dark"
            style={{ width: "100%" }}
            type="submit"
            onClick={props.onHide}
          >
            Ekle
          </Button>
        </form>
      </Modal.Body>
    </>
  );
};

export default AddBoardForm;
