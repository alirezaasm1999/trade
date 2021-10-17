import "./App.css";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Regoster/Register";
import Dashboard from "./components/Dashboard";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <CookiesProvider>
      <div className={`mainDiv`}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route  path="/dashboard" component={Dashboard} />

        </Switch>
      </div>
    </CookiesProvider>
  );
}

export default App;
