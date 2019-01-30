import React from 'react';
import PollAdminAnswers from './PollAdminAnswers';

const PollAdminQuestionCard = props => {
  let deleteButtonCSS = 'ui icon button right floated';

  if (!props.isDeleteEnabled) {
    deleteButtonCSS += ' disabled';
  }

  return (
    <div className="ui segment clearing segment">
      <div className="ui container">
        <button
          className={deleteButtonCSS}
          onClick={props.onClickDeleteQuestionCard}>
          <i className="icon trash alternate" />
        </button>
      </div>
      <div className="field">
        <div className="header">Question</div>
        <textarea
          rows="4"
          value={props.question}
          onChange={e => props.onQuestionChangeText(e.target.value)}
        />
      </div>
      <div className="header">Answers</div>
      <PollAdminAnswers
        answers={props.answers}
        handleClickAddAnswer={e => props.onClickQuestionAddAnswer(e, props.id)}
        handleClickRemoveAnswer={(index, e) =>
          props.onClickQuestionRemoveAnswer(index, e, props.id)
        }
        onChangeAnswerText={(index, text) =>
          props.onChangeAnswerText(index, text, props.id)
        }
      />
    </div>
  );
};

export default PollAdminQuestionCard;
