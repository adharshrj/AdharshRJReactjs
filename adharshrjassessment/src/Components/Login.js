import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import React, { useState, useRef  } from "react";
import "./Login.css";
import {useHistory} from "react-router-dom"
import {login} from "./Services/AuthService";
const regex = /^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/;
const urequired = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    } else if (!regex.context(value)){
      return (
        <div className="alert alert-danger" role="alert">
          Invalid username!
        </div>
      );
    }
  };

  const prequired = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };


export default function Login() {
    const form = useRef();
    const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  
  
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);
    
   form.current.validateAll();
   
    if (checkBtn.current.context._errors.length === 0) {
      login(username, password).then(
        () => {
          history.push("/dashboard");
          window.location.reload();
        }, (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  
  return (
    <>
        <div className="MyStudentLogin" align = "center">
          <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[urequired]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[prequired]}
            />
          </div>

          <div className="form-group">
            <button className="btn-custom" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
 </>
  );
}
