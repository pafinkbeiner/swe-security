import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { CookiesProvider } from "react-cookie"
import Items from './components/Items/Items';
import Admin from "./components/Admin/Admin";

function App() {
  return (
    <CookiesProvider>
      <Router>
        <Switch>
          <Route path="/admin" component={Admin}/>
          <Route path="/items" component={Items} />
          <Route path="/login" component={Login}/>
          <Route path="/" component={Register}/>
        </Switch>
      </Router>
    </CookiesProvider>

  );
}

export default App;
