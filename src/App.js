import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WeatherContextProvider from './context/WeatherContext';
import Header from './components/Header/Header'
import Home from './pages/Home';
import Aviation from './pages/Aviation'
import Footer from './components/Footer/Footer'


function App() {
  return (
    <div className="App">
      <WeatherContextProvider>
        <Router>
          <Header />
          <Switch>
            <Route exact path='/'><Home /></Route>
            <Route path='/aviation'><Aviation /></Route>
          </Switch>
          <Footer />
        </Router>
      </WeatherContextProvider>
    </div>
  );
}

export default App;
