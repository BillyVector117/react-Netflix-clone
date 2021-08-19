import './App.scss';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
// Pages
import Home from "./pages/home/Home"
import Watch from "./pages/watch/Watch"
import Register from "./pages/register/Register"
import Login from "./pages/login/Login"
import { useContext } from 'react';
import { AuthContext } from './context/authContext/AuthContext';
function App() {
  const { user } = useContext(AuthContext)
  return (
    <Switch>
      <Route exact path="/">
        {user ? <Home /> : <Redirect to="/register" />}
      </Route>
      <Route exact path="/register">
        {!user ? <Register /> : <Redirect to="/" />}
      </Route>
      <Route exact path="/login">
        {!user ? <Login /> : <Redirect to="/" />}
      </Route>
      <Route path="/movies">
        <Home type="movie" />
      </Route>
      <Route path="/series">
        <Home type="serie" />
      </Route>
      <Route path="/watch">
        <Watch />
      </Route>
    </Switch>
  );
}
export default App;
