import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Items from "./components/Items/Items";
import Admin from "./components/Admin/Admin";
import Navigation from "./components/Navigation/Navigation";
import SelectedItem from './components/Items/SelectedItem';
import Purchase from "./pages/Purchase/Purchase";

function App() {
  const normalView = () => {
    return (
      <div>
        <Navigation />
        <Items />
      </div>
    );
  };

  const adminView = () => {
    return <div>
      <Navigation/>
      <Admin/>
    </div>
  }


  return (
    <CookiesProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={normalView}/>
          <Route exact path="/admin" component={adminView} />
          <Route exact path="/items" component={normalView} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/items/:name" component={SelectedItem} />
          <Route exact path="/purchase/:name" component={Purchase} />
        </Switch>
      </Router>
    </CookiesProvider>
  );
}

export default App;
