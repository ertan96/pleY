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
          <Route path="/businesses/:id">
            <BusinessShowPage/>
          </Route>
          <Route path="/reviews/new" component={ReviewFormPage} />
          <Route path="/businesses">
            <BusinessIndex/>
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <HomepagePhoto/>
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
        <FooterTags/>
    </>
  );
}

export default App;
