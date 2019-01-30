import React from 'react';

const PollResultsQuestionCard = props => {
  const renderAnswers = ({ answers, response }) => {
    return answers.map(answer => {
      const iconCSS =
        answer === response ? 'icon check circle' : 'icon circle outline';
      return (
        <div key={answer} className="item">
          <i className={iconCSS} />
          {answer}
        </div>
      );
    });
  };
  return (
    <div className="item">
      <div className="content">{props.question.question}</div>
      <div className="extra">
        <div className="ui list">{renderAnswers(props.question)}</div>
      </div>
    </div>
  );
};

export default PollResultsQuestionCard;
