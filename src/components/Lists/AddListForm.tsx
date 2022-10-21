import React, { FC, useState, useEffect } from "react";
import { Card, Button, FloatingLabel, Form } from "react-bootstrap";
import { ListAddProps, ListAddValuesProps } from "./Lists.types";
import { useFormik } from "formik";
import * as Yup from "yup";
import jwt_decode from "jwt-decode";

const AddListForm: FC<ListAddProps> = (props) => {
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
      boardId: props.boardId,
      ownerId: userId,
    } as ListAddValuesProps,
    validationSchema: Yup.object({
      title: Yup.string().required("Bu alan boş geçilemez."),
      boardId: Yup.number().required("Bu alan boş geçilemez."),
      ownerId: Yup.number().required("Bu alan boş geçilemez."),
    }),
    onSubmit: (values) => {
      values.ownerId = userId;
      props.onListAdd?.(values);
      values.title = "";
    },
  });

  return (
    <Card
      className="p-3 card_body"
      style={{
        height: "auto",
        borderRadius: "20px",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <FloatingLabel label="Liste Başlığı" className="mb-2">
          <Form.Control
            id="title"
            name="title"
            type="text"
            placeholder="Liste Başlığı"
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
          style={{ width: "50%" }}
          variant="outline-success"
          type="submit"
          title="Ekle"
          onClick={() => props.closeBtn()}
        >
          <i className="fa-solid fa-check"></i>
        </Button>
        <Button
          style={{ width: "50%" }}
          onClick={() => props.closeBtn()}
          variant="outline-danger"
          type="button"
          title="Vazgeç"
        >
          <i className="fa-solid fa-xmark"></i>
        </Button>
      </form>
    </Card>
  );
};

export default AddListForm;
