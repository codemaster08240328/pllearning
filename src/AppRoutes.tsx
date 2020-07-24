import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from './containers/Home/HomePage';
import ApplyRouter from './containers/Apply/ApplyRoutes';
import Analyze from './containers/Apply/Analyze';
import HardWork from './containers/HardWork/HardWork';
import ApplicationSaved from './containers/ApplicationSaved/ApplicationSaved';
import ApplicationSummary from './containers/ApplicationSummary/ApplicationSummary';
import GreatNews from './containers/Applications/GreatNews';
import Sorry from './containers/Applications/Sorry';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/apply/analyze/:type" exact component={Analyze} />
      <Route path="/apply">
        <ApplyRouter />
      </Route>
      <Route path="/hardwork" exact component={HardWork} />
      <Route path="/application-saved" exact component={ApplicationSaved} />
      <Route path="/application-summary" exact component={ApplicationSummary} />
      <Route path="/application-greatnews" exact component={GreatNews} />
      <Route path="/application-sorry" exact component={Sorry} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
