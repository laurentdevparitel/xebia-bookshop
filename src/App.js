
import {BrowserRouter as Router, Route, Switch}  from 'react-router-dom';

//import logo from './images/logo.svg';
import './styles/App.css';

// -- Components
import ErrorBoundary  from "./components/ErrorBoundary/ErrorBoundary";

import NavBar  from "./components/NavBar/NavBar";

// -- Views
import Home from './views/Home';
import ShowCase from './views/ShowCase';
import Cart from './views/Cart';

function App() {
  return (
    <Router>
      <div className="App">

          <NavBar />

          <Switch>
            <ErrorBoundary>
              <Route exact path="/" component={Home}/>
              <Route exact path="/catalog" component={ShowCase}/>
              <Route exact path="/cart" component={Cart}/>
            </ErrorBoundary>
          </Switch>
      </div>

    </Router>
  );
}

export default App;
