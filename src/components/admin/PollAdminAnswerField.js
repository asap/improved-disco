import React from 'react';

const PollAdminAnswerField = props => {
  const { isAddNewEnabled, isDeleteEnabled } = props;
  let minusButtonCSS = 'ui icon button';

  if (!isDeleteEnabled) {
    minusButtonCSS += ' disabled';
  }

  return (
    <div className="inline fields">
      <div className="wide field">
        <input
          type="text"
          value={props.text}
          onChange={e => props.onChangeAnswerText(e.target.value)}
        />
      </div>
      <div className="field">
        <button
          className={minusButtonCSS}
           onClick={props.onClickRemoveAnswer}>
          <i className="minus circle icon" />
        </button>
        {isAddNewEnabled && (
          <button className="ui icon button" onClick={props.onClickAddAnswer}>
            <i className="plus circle icon" />
          </button>
        )}
      </div>
    </div>
  );
}

export default PollAdminAnswerField;
