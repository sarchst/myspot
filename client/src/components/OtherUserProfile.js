import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

class OtherUserProfile extends React.Component {
    render() {
      // TODO: restrict username to have no spaces
    if (this.props.match.params.user === this.props.user.id) {
      return <Redirect to={"/" + this.props.user.id}></Redirect>;
    } else {
      return <h1>Other User Profile Component Belong to {this.props.match.params.user}</h1>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(OtherUserProfile);
