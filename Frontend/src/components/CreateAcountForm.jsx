import React, { useState } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { emailValidation, minLengthValidation } from "../utils/formValidation";
import { createAcountApi } from "../api/users";
import "../css/CreateAcountForm.css";

const CreateAcountForm = () => {
  const [inputs, setInputs] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    repeatPassword: "",
    privacyPolicy: false,
  });

  const [formValid, setFormValid] = useState({
    email: false,
    password: false,
    repeatPassword: false,
    privacyPolicy: false,
  });

  const changeForm = (e) => {
    if (e.target.name === "privacyPolicy") {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.checked,
      });
    } else {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    }
  };

  const inputValidations = (e) => {
    const { type, name } = e.target;

    // if (type === "name") {
    //   setFormValid({
    //     ...formValid,
    //     [name]: e.target.value,
    //   });
    // }

    // if (type === "lastname") {
    //   setFormValid({
    //     ...formValid,
    //     [name]: e.target.value,
    //   });
    // }

    if (type === "email") {
      setFormValid({
        ...formValid,
        [name]: emailValidation(e.target),
      });
    }

    if (type === "password") {
      setFormValid({
        ...formValid,
        [name]: minLengthValidation(e.target, 6),
      });
    }
    if (type === "checkbox") {
      setFormValid({
        ...formValid,
        [name]: e.target.checked,
      });
    }
  };

  const register = async (e) => {
    const emailVal = inputs.email;
    const passwordVal = inputs.password;
    const repeatPasswordVal = inputs.repeatPassword;
    const privacyPolicyVal = inputs.privacyPolicy;

    if (!emailVal || !passwordVal || !repeatPasswordVal || !privacyPolicyVal) {
      notification["error"]({
        message: "Todos los campos son obligatorios...",
      });
    } else if (passwordVal !== repeatPasswordVal) {
      notification["error"]({
        message: "Las contrasenias tienen que ser iguales...",
      });
    } else {
      const result = await createAcountApi(inputs);

      if (!result.ok) {
        notification["error"]({
          message: result.message,
        });
      } else {
        notification["success"]({
          message: result.message,
        });
        resetForm();
      }
    }
  };

  const resetForm = () => {
    const inputs = document.getElementsByTagName("input");

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove("success");
      inputs[i].classList.remove("error");
    }

    setInputs({
      email: "",
      password: "",
      repeatPassword: "",
      privacyPolicy: false,
    });

    setFormValid({
      email: false,
      password: false,
      repeatPassword: false,
      privacyPolicy: false,
    });
  };

  return (
    <Form className="register-form" onFinish={register} onChange={changeForm}>
      <Form.Item>
        <Input
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25" }} />}
          type="text"
          name="name"
          placeholder="Nombre"
          className="register-form__input"
          onChange={inputValidations}
          value={inputs.name}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25" }} />}
          type="text"
          name="lastname"
          placeholder="Apellido"
          className="register-form__input"
          onChange={inputValidations}
          value={inputs.lastname}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25" }} />}
          type="email"
          name="email"
          placeholder="Correo electronico"
          className="register-form__input"
          onChange={inputValidations}
          value={inputs.email}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25" }} />}
          type="password"
          name="password"
          placeholder="Contrasenia"
          className="register-form__input"
          onChange={inputValidations}
          value={inputs.password}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25" }} />}
          type="password"
          name="repeatPassword"
          placeholder="Repetir contrasenia"
          className="register-form__input"
          onChange={inputValidations}
          value={inputs.repeatPassword}
        />
      </Form.Item>
      <Form.Item>
        <Checkbox
          name="privacyPolicy"
          onChange={inputValidations}
          cheched={inputs.privacyPolicy}
        >
          Acepto los terminos...
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="register-form__button">
          Crear cuenta
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateAcountForm;
