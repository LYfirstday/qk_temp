import React from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
import Home from '@pages/home';
import Other from '@pages/other';

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/other" component={Other} />
    </Router>
  );
};

export default App;
