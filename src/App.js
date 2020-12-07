
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
import NoMatchView from './views/NoMatchView';

function App() {
  return (
    <Router>
      <div className="App">

          <SearchAppBar />

          <Switch>

              <Route exact path="/">
                  <ErrorBoundary>
                    <HomeView />
                  </ErrorBoundary>
              </Route>

              <Route exact path="/catalog">
                  <ErrorBoundary>
                    <ShowCaseView />
                  </ErrorBoundary>
              </Route>

              <Route exact path="/cart">
                  <ErrorBoundary>
                    <CartView />
                  </ErrorBoundary>
              </Route>

              <Route path="*">
                  <ErrorBoundary>
                    <NoMatchView />
                  </ErrorBoundary>
              </Route>

          </Switch>
      </div>

    </Router>
  );
}

export default App;
