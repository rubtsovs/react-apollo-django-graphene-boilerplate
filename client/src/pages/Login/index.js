import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Container } from "reactstrap";

import { LoginForm } from "components/Forms/LoginForm/index";

import * as path from "constants/routes";
import { login } from "queries/index";
import { saveData } from "utils/index";

const Login = ({ login, history }) => {
  const handleLogin = async (values, { setErrors }) => {
    const response = await login({ variables: { ...values } });
    if (!response.data.login.error) {
      const token = response.data.login.token;
      saveData("token", token);
      history.push(path.DASHBOARD);
    } else {
      let errors = {};
      response.data.login.error.validationErrors.map(error => {
        if (error["field"] === "__all__") {
          errors["username"] = error["messages"].join(" ");
          errors["password"] = error["messages"].join(" ");
        } else {
          errors[error] = error["messages"];
        }
        return null;
      });
      setErrors(errors);
    }
  };

  return (
    <Container>
      <LoginForm login={handleLogin} />
    </Container>
  );
};

export default graphql(login, { name: "login" })(Login);
