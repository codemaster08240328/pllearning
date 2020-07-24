import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { BackIcon } from '../../components/Icons';
import StepFlow from '../../components/StepFlow';

type TSelectItem = {
  value: string;
};

const educations = ['PhD', 'Masters', 'Bachelors', 'Diploma', 'High School'];

const Education = () => {
  const [education, setEducation] = useState('');
  const history = useHistory();

  const SelectItem: React.FC<TSelectItem> = ({ value }) => {
    let className = 'mmk-loan-dependants-item ';
    if (education === value) {
      className += 'item-clicked ';
    }

    return (
      <div
        className={className}
        onClick={() => {
          setEducation(value);
          setTimeout(() => history.push('/apply/12'), 1000);
        }}
      >
        {value}
      </div>
    );
  };

  return (
    <>
      <Link to="/apply/10" className="go-back">
        <BackIcon size={24} />
      </Link>
      <StepFlow total={15} step={11} />
      <div className="mmk-loan-dependants">
        <h3 className="color-text-blue-dark">Last educational qualification</h3>
        <div className="mmk-loan-dependants-items">
          {educations.map((item) => (
            <SelectItem value={item} key={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Education;
