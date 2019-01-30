import React from 'react';
import slugify from 'slugify';

const PollShowAnswerField = props => {
  const { text, questionSlug, onOptionChange, selected} = props;
  const slug = slugify(text.toLowerCase());
  return (
    <div className="field">
      <div className="ui radio checkbox">
        <input
          type="radio"
          id={slug}
          name={questionSlug}
          checked={selected === text}
          value={text}
          onChange={onOptionChange}
        />
        <label htmlFor={slug}>{text}</label>
      </div>
    </div>
  );
};

export default PollShowAnswerField;
