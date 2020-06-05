import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import Sidebar from './components/Sidebar';
import Appbar from './components/Appbar';
import Login from "./components/Login";

const loginPage = () => {
    return (<div className="App">
        <Login />
    </div>
    );
}

let contentPage = () => {
    return (<div className="App">
            <Appbar/>
            <Sidebar />
        </div>
    );
}

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.isLoggedIn) {
            return contentPage();
        } else {
            return loginPage();

        }
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn,
        username: state.username
    }
}

export default connect(mapStateToProps)(App);


// function App() {
//   return (
//     <div className="App">
//       {/*<Appbar />*/}
//       {/*<Sidebar />*/}
//       <Login />
//     </div>
//   );
// }
//
// export default App;
