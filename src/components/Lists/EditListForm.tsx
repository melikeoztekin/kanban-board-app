import React, { FC, useState } from "react";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import service from "../../services/instance";
import jwt_decode from "jwt-decode";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ListItemProps, ListItemValuesProps } from "./Lists.types";
import { toast } from "react-toastify";

const EditListForm: FC<ListItemProps> = (props: any) => {
  const [userId, setUserId] = useState(0);
  const updateList = (data: any) => {
    let token = localStorage.getItem("token");
    let userId: 0;
    if (token !== null) {
      let decode: any = jwt_decode(token);
      userId = decode.id;
    }
    service
      .put("list/" + `${props.list.id}`, data, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then(() => {
        toast.success("güncelleme başarılı");
        props.getList();
      })
      .catch(() => {
        toast.error("bir hata oluştu.");
      });
  };

  const formik = useFormik({
    initialValues: {
      title: props.list.title,
      boardId: props.list.boardId,
      ownerId: userId,
    } as ListItemValuesProps,
    validationSchema: Yup.object({
      title: Yup.string().required("Bu alan boş geçilemez."),
      boardId: Yup.number().required("Bu alan boş geçilemez."),
      ownerId: Yup.number().required("Bu alan boş geçilemez."),
    }),
    onSubmit: (values) => {
      values.ownerId = userId;
      updateList(values);
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Board Düzenle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FloatingLabel label="Board adı" className="mb-3">
            <Form.Control
              id="title"
              name="title"
              type="text"
              placeholder="Board adı giriniz..."
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
            Kaydet
          </Button>
        </form>
      </Modal.Body>
    </>
  );
};

export default EditListForm;
