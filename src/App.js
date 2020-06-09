import React from "react";
import "./App.css";
import { connect } from "react-redux";
import Sidebar from "./components/Sidebar";
import Appbar from "./components/Appbar";
import Login from "./components/Login";
import { BrowserRouter as Router } from "react-router-dom";

const loginPage = () => {
  return (
    <div className="App">
      <Login />
    </div>
  );
};

let contentPage = () => {
  return (
    <div className="App">
      <Appbar />
      <Sidebar />
    </div>
  );
};

class App extends React.Component {
  // render() {
  //   if (this.props.isLoggedIn) {
  //     return contentPage();
  //   } else {
  //     return loginPage();
  //   }
  // }

  render() {
    return (
      <Router>
        <div className="App">
          <Appbar />
          <Sidebar />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    username: state.username,
  };
};

export default connect(mapStateToProps)(App);
