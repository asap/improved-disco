import React from 'react';
import PollAdminAnswerField from './PollAdminAnswerField';

const PollAdminAnswers = props => {
  const isLastElement = index => props.answers.length === index + 1;

  return props.answers.map((answer, index) => (
    <PollAdminAnswerField
      key={index}
      text={answer}
      isAddNewEnabled={isLastElement(index)}
      isDeleteEnabled={props.answers.length > 1}
      onClickAddAnswer={props.handleClickAddAnswer}
      onClickRemoveAnswer={e => props.handleClickRemoveAnswer(index, e)}
      onChangeAnswerText={text => props.onChangeAnswerText(index, text)}
    />
  ));
};

export default PollAdminAnswers;
