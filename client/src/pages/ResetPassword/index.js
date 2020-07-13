import React from "react";
import { graphql } from "react-apollo";

import * as path from "constants/routes";
import { Container } from "reactstrap";

import { ResetPasswordForm } from "components/Forms/ResetPasswordForm/index";
import { resetPassword } from "queries/index";

const ResetPassword = ({ resetPassword, history, match }) => {
  const handleResetPassword = async (values, { setErrors }) => {
    const response = await resetPassword({ variables: { ...values } });
    if (!response.data.resetPassword.error.validationErrors.length) {
      if (response.data.resetPassword.success) {
        alert("Your password has been changed successfully!");
        history.push(path.HOME);
      } else {
        alert("Your account is unconfirmed.");
      }
    } else {
      let errors = {};
      response.data.resetPassword.error.validationErrors.map(error => {
        if (error["field"] === "__all__") {
          errors["new_password2"] = error["messages"].join(" ");
        } else if (error["field"] === "new_password2") {
          errors["newPassword2"] = error["messages"].join(" ");
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
      <ResetPasswordForm
        resetPassword={handleResetPassword}
        uid={match.params.uid}
        confirmToken={match.params.confirmToken}
      />
    </Container>
  );
};

export default graphql(resetPassword, { name: "resetPassword" })(ResetPassword);
