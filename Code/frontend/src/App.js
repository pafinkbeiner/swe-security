import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Register from './components/Register/Register';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { CookiesProvider } from "react-cookie"

function App() {
  return (
    <CookiesProvider>
      <Router>
        <Switch>
          <Route path="/Login" component={Login}/>
          <Route path="/" component={Register}/>
        </Switch>
      </Router>
    </CookiesProvider>

  );
}

export default App;
