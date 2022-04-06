import "./styles/index.scss";
import React from "react";
import { UserContext } from "./components/AppContext";
import Routes from "./routes/routes";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            handleLogin: this.handleLogin,
            handleLogout: this.handleLogout
        }
    }

    handleLogin = (user) => {
        this.setState({ user })
    }

    handleLogout = () => this.setState({ user: null });

    render() {
        return (
            <UserContext.Provider value={this.state}>
                <Routes user={this.state.user} />
            </UserContext.Provider>
        )
    }
}

export default App;
