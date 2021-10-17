import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import "./Register.css";
import { useState } from "react";
import firebaseConfig from "../../../server/firebase";
import { FcPrivacy } from "react-icons/fc";
import { Spin } from "antd";
import { ToastContainer, toast } from "react-toastify";
import {  useHistory } from "react-router-dom";

let Register = () => {
  const [state, setState] = useState({ username: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const handleChange = (name, e) => {
    setState({ ...state, [name]: e.target.value });
  };
  const onFinish = (values) => {
    console.log("Success:", values);


    setIsLoading(true);
    firebaseConfig
      .auth()
      .createUserWithEmailAndPassword(state.email, state.password)
      .then((createdUser) => {
        setIsLoading(false);
        console.log("createdUser", createdUser);
        setTimeout(() => {
          history.push("/");
        }, 5500);
        toast.success("User successfully created", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((serverError) => {
        setIsLoading(false);
        toast.error(serverError.message, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  return [
    <div className="parentDivRegister">
      <div className="registerForm">
        <div className="headerRegisterDiv">
          <FcPrivacy size="62" />
          <h2>Register</h2>
        </div>

        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={state}
          onFinish={onFinish}
          autoComplete="off"
        >


          <Form.Item
            label="email"
            name="email"
            value={state.email}
            onChange={(e) => handleChange("email", e)}
            rules={[
              {
                required: true,
                message: "Please input your email!",
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="password"
            name="password"
            value={state.password}
            onChange={(e) => handleChange("password", e)}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            {isLoading ? (
              <Spin size="large" />
            ) : (
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>,
    <ToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />,
  ];
};

export default Register;
