import React, { useState } from 'react';

import { ArrowIcon } from '../../components/Icons';

import { IFAQProps } from './types';
import './FAQ.scss';

const FAQComponent: React.FC<IFAQProps> = ({
  question,
  children,
  showDivider,
}) => {
  const [showAnswer, setshowAnswer] = useState(false);
  return (
    <div className="faq-item">
      <div
        className="faq-item-question"
        onClick={() => setshowAnswer(!showAnswer)}
      >
        <span>{question}</span>
        <ArrowIcon
          direction={showAnswer ? 'up' : 'down'}
          color={showAnswer ? '#3ba3ff' : ''}
        />
      </div>
      {showAnswer && <div className="faq-item-answer">{children}</div>}
      {showDivider && !showAnswer && <div className="faq-divider" />}
    </div>
  );
};

export default FAQComponent;
