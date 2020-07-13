import React from "react";
import { graphql } from "react-apollo";

import * as path from "constants/routes";
import { Container } from "reactstrap";

import { SignUpForm } from "components/Forms/SignUpForm/index";
import { register } from "queries/index";

const SignUp = ({ register, history }) => {
  const handleSignUp = async (values, { setErrors }) => {
    const response = await register({ variables: { ...values } });
    if (!response.data.register.success) {
      const validationErrors = response.data.register.error.validationErrors;
      let errors = {};
      for (const key in validationErrors) {
        const item = validationErrors[key];
        if (validationErrors.hasOwnProperty(key)) {
          errors[item["field"]] = item["messages"];
        }
      }
      return setErrors(errors);
    }
    return history.push(path.SIGN_IN);
  };

  return (
    <Container>
      <SignUpForm register={handleSignUp} />
    </Container>
  );
};

export default graphql(register, { name: "register" })(SignUp);
