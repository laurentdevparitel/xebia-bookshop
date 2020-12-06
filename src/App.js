
import {BrowserRouter as Router, Route, Switch}  from 'react-router-dom';

//import logo from './images/logo.svg';
import './styles/App.css';

// -- Components
import ErrorBoundary  from "./components/ErrorBoundary/ErrorBoundary";

import SearchAppBar  from "./components/SearchAppBar/SearchAppBar";

// -- Views
import HomeView from './views/HomeView';
import ShowCaseView from './views/ShowCaseView';
import CartView from './views/CartView';

function App() {
  return (
    <Router>
      <div className="App">

          <SearchAppBar />

          <Switch>
            <ErrorBoundary>
              <Route exact path="/" component={HomeView}/>
              <Route exact path="/catalog" component={ShowCaseView}/>
              <Route exact path="/cart" component={CartView}/>
            </ErrorBoundary>
          </Switch>
      </div>

    </Router>
  );
}

export default App;
