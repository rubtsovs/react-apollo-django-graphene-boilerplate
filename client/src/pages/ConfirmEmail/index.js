import React from "react";
import { graphql } from "react-apollo";
import { Container } from "reactstrap";

import * as path from "constants/routes";

import { ConfirmEmailForm } from "components/Forms/ConfirmEmailForm/index";
import { confirmEmail } from "queries/index";

const ConfirmEmail = ({ confirmEmail, history }) => {
  const handleConfirmEmail = async (values, { setErrors }) => {
    const response = await confirmEmail({
      variables: {
        email: values.email
      }
    });
    if (!response.data.confirmEmail.error) {
      alert("Check your email, please!");
      history.push(path.HOME);
    } else {
      let errors = {};
      response.data.confirmEmail.error.validationErrors.map(error => {
        if (error["field"] === "__all__") {
          errors["email"] = error["messages"].join(" ");
        } else if (error["field"] === "email") {
          errors["email"] = error["messages"].join(" ");
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
      <ConfirmEmailForm confirmEmail={handleConfirmEmail} />
    </Container>
  );
};

export default graphql(confirmEmail, { name: "confirmEmail" })(ConfirmEmail);
