import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import "./Login.css";
import { useState } from "react";
import firebaseConfig from "../../../server/firebase";
import { FcImport } from "react-icons/fc";
import { Spin } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { useHistory, Link } from "react-router-dom";
let Login = () => {
  const [state, setState] = useState({ username: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const history = useHistory();
  const handleChange = (name, e) => {
    setState({ ...state, [name]: e.target.value });
  };
  const onFinish = (values) => {
    console.log("Success:", values);

    // seterrorState(() => []);
    setIsSuccess(false);

    setIsLoading(true);
    firebaseConfig
      .auth()
      .signInWithEmailAndPassword(state.email, state.password)
      .then((createdUser) => {
        setIsLoading(false);
        setTimeout(() => {
          history.push("/dashboard");
        }, 2500);
        toast.success("Welcome", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.log("createdUser", createdUser);
      })
      .catch((serverError) => {
        setIsLoading(false);
        console.log("serverError", serverError);
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
        <div className="headerLoginDiv">
          <FcImport size="62" />
          <h2>Login</h2>
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
            <p>
              Do you need create your account?
              <span onClick={() => history.push("/register")}>
                <b>SignUp</b>
              </span>
            </p>
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

export default Login;
