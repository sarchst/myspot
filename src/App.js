import React from "react";
import "./App.css";
import { connect } from "react-redux";
import Sidebar from "./components/Sidebar";
import Appbar from "./components/Appbar";
import Login from "./components/Login";
import { BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const loginPage = () => {
  return (
    <div className="App">
      <Login />
    </div>
  );
};

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#6200EE",
      variant: "#3700B3",
    },
    secondary: {
      main: "#03DAC6",
      variant: "#018786",
    },
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#BB86FC",
      variant: "#3700B3",
    },
    secondary: {
      main: "#03DAC6",
    },
  },
});
class App extends React.Component {
  selectTheme = () =>
    this.props.accountSettings.darkmode ? darkTheme : lightTheme;

  render() {
    if (this.props.isLoggedIn) {
      return (
        <ThemeProvider theme={this.selectTheme()}>
          <Router>
            <div className="App">
              <Appbar />
              <Sidebar />
            </div>
          </Router>
        </ThemeProvider>
      );
    } else {
      // TODO: use React Router/redirect to from login page to main page after authentication is implemented
      return loginPage();
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    username: state.username,
    accountSettings: state.accountSettings,
  };
};

export default connect(mapStateToProps)(App);
