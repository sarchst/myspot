import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// reference: https://mtm.dev/react-router-scroll-to-top/
class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return <React.Fragment />;
  }
}

export default withRouter(ScrollToTop);
