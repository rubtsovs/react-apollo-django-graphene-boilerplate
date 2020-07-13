import React, { Component } from "react";
import { graphql } from "react-apollo";

import { verifyToken } from "../queries";

export const withAuth = ProtectedRoute => {
  class PrivateRoute extends Component {
    async componentDidMount() {
      try {
        const token = JSON.parse(window.localStorage.getItem("token")).token;

        await this.props.authorization({ variables: { token } });
      } catch (error) {
        this.props.history.push("/login");
      }
    }
    render() {
      return <ProtectedRoute {...this.props} />;
    }
  }
  return graphql(verifyToken, { name: "authorization" })(PrivateRoute);
};
