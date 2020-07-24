import React from 'react';
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
  Link,
} from 'react-router-dom';

import { getStepFromPath } from '../../utitlity/helper';
import { BackIcon } from '../../components/Icons';
import StepFlow from '../../components/StepFlow';

import Dependants from './Dependants';

import './loan.scss';
import Education from './Education';
import ConfirmEmail from './ConfirmEmail';
import SelectEmail from './SelectEmail';
import OfficeAddress from './OfficeAddress';
import UploadDocu from './UploadDocu';

const LoanRoutes = () => {
  const { path } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const step = getStepFromPath(location.pathname);

  return (
    <div className="mmk-loan">
      <Link
        to={step === 1 ? '/hardwork' : `/loan/${step - 1}`}
        className="go-back"
      >
        <BackIcon size={24} />
      </Link>
      <StepFlow total={6} step={step} />
      <Switch>
        <Route path={`${path}/1`} exact component={Dependants} />
        <Route path={`${path}/2`} exact component={Education} />
        <Route path={`${path}/3`} exact component={ConfirmEmail} />
        <Route path={`${path}/4`} exact component={SelectEmail} />
        <Route path={`${path}/5`} exact component={OfficeAddress} />
        <Route path={`${path}/6`} exact component={UploadDocu} />
      </Switch>
    </div>
  );
};

export default LoanRoutes;
