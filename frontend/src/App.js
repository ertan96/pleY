import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
import BusinessIndex from "./components/BusinessIndex";
import BusinessShowPage from './components/BusinessShowPage';
import FooterTags from './components/FooterTags';
import ReviewFormPage from './components/ReviewFormPage';
import { LoadScript } from '@react-google-maps/api';


function App() {
  return (
    <>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_MAPS_API_KEY}>
        <Navigation />
          <Switch>
            <Route path="/businesses/:id" component={BusinessShowPage} />
            <Route path="/reviews/new/:businessId" component={ReviewFormPage} />
            <Route path="/reviews/edit/:reviewId" component={ReviewFormPage} />
            <Route path="/businesses" component={BusinessIndex} />
            <Route path="/search/:term" component={BusinessIndex} />
            <Route exact path="/search/" component={BusinessIndex} />
            <Route path="/login" component={LoginFormPage} />
            <Route path="/signup" component={SignupFormPage} />
            <Route exact path="/" component={Homepage} />
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        <FooterTags />
      </LoadScript>
    </>
  );
}

export default App;
