import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import HomepagePhoto from "./components/HomepagePhoto";
import BusinessIndex from "./components/BusinessIndex";
import BusinessShowPage from './components/BusinessShowPage';
import FooterTags from './components/FooterTags';
import ReviewFormPage from './components/ReviewFormPage';


function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/businesses/:id" component={BusinessShowPage} />
        <Route path="/reviews/new/:businessId" component={ReviewFormPage} />
        <Route path="/reviews/edit/:reviewId" component={ReviewFormPage} />
        <Route path="/businesses" component={BusinessIndex} />
        <Route path="/login" component={LoginFormPage} />
        <Route path="/signup" component={SignupFormPage} />
        <Route exact path="/" component={HomepagePhoto} />
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
      <FooterTags />
    </>
  );
}

export default App;
