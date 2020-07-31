import React, { useEffect } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from 'containers/Home/HomePage';
import ApplyRouter from 'containers/Apply/ApplyRoutes';
import Analyze from 'containers/Apply/Analyze';
import ApplicationSaved from 'containers/ApplicationSaved/ApplicationSaved';
import ApplicationSummary from 'containers/ApplicationSummary/ApplicationSummary';
import GreatNews from 'containers/Applications/GreatNews';
import Sorry from 'containers/Applications/Sorry';

import { IPLAppState } from 'redux/reducers';
import { IPLAppData } from 'services/getPLApplication/types';
import { ILoading } from 'redux/reducers/types';

import { fetchApplication } from 'redux/actions/plApplication';
import GetLoanFaster from 'containers/Applications/GetLoanFaster';
import ApplicationApproved from 'containers/HardWork/ApplicationApproved';
import ApplicationPending from 'containers/HardWork/ApplicationPending';

interface StateProps {
  plApplication: IPLAppData & ILoading;
}

interface DispatchProps {
  getApplication: () => void;
}

const AppRouter: React.FC<StateProps & DispatchProps> = ({
  getApplication,
}) => {
  useEffect(() => {
    getApplication();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/apply/analyze/:type" exact component={Analyze} />
        <Route path="/apply">
          <ApplyRouter />
        </Route>
        <Route
          path="/application-approved"
          exact
          component={ApplicationApproved}
        />

        <Route
          path="/application-pending"
          exact
          component={ApplicationPending}
        />

        <Route path="/application-saved" exact component={ApplicationSaved} />
        <Route
          path="/application-summary/:type"
          exact
          component={ApplicationSummary}
        />
        <Route path="/application-greatnews" exact component={GreatNews} />
        <Route path="/application-sorry" exact component={Sorry} />
        <Route path="/loan-faster" exact component={GetLoanFaster} />
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (action: IPLAppState) => {
  return { plApplication: action.plApplicationDetail };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getApplication: fetchApplication,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
