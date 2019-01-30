import React from 'react';
import slugify from 'slugify';
import PollShowAnswerField from '../show/PollShowAnswerField';

const PollShowQuestionCard = props => {
  return (
    <div className="ui segment">
      <h2>{props.question.question}</h2>
      {props.question.answers.map((answer, index) => (
        <PollShowAnswerField
          key={slugify(answer, { lower: true })}
          questionSlug={slugify(props.question.question, { lower: true })}
          text={answer}
          selected={props.question.response}
          onOptionChange={e => {
            props.onAnswerQuestion(index, answer, props.question.id);
          }}
        />
      ))}
    </div>
  );
};

export default PollShowQuestionCard;
