import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import LoanAmount from './LoanAmount';
import LoanDuration from './LoanDuration';
import IncomeType from './IncomeType';
import Salary from './Salary';
import Company from './Company';
import BankSalary from './BankSalary';
import Address from './Address';
import AddressDuration from './AddressDuration';
import CityDuration from './CityDuration';
import Dependants from './Dependants';
import Education from './Education';
import ConfirmEmail from './ConfirmEmail';
import SelectEmail from './SelectEmail';
import OfficeAddress from './OfficeAddress';
import UploadDocu from './UploadDocu';
import './applyscreen.scss';
import './loan.scss';

const ApplyRouter = () => {
  const { path } = useRouteMatch();

  return (
    <div className="mmk-apply">
      <Switch>
        <Route path={`${path}/1`} exact component={LoanAmount} />
        <Route path={`${path}/2`} exact component={LoanDuration} />
        <Route path={`${path}/3`} exact component={IncomeType} />
        <Route path={`${path}/4`} exact component={Salary} />
        <Route path={`${path}/5/:type`} exact component={Company} />
        <Route path={`${path}/6/:type`} exact component={BankSalary} />
        <Route path={`${path}/7/:type`} exact component={Address} />
        <Route path={`${path}/8/:type`} exact component={AddressDuration} />
        <Route path={`${path}/9/:type`} exact component={CityDuration} />
        <Route path={`${path}/10`} exact component={Dependants} />
        <Route path={`${path}/11`} exact component={Education} />
        <Route path={`${path}/12`} exact component={ConfirmEmail} />
        <Route path={`${path}/13`} exact component={SelectEmail} />
        <Route path={`${path}/14`} exact component={OfficeAddress} />
        <Route path={`${path}/15/:type`} exact component={UploadDocu} />
      </Switch>
    </div>
  );
};

export default ApplyRouter;
