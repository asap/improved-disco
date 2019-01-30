import React from 'react';

const Welcome = props => {
  return (
    <div className="ui segment">
      <div className="ui centered raised card">
        <div className="image">
          <img src="asap.jpg" alt="Alexander Sapountzis | ASAP" />
        </div>
        <div className="content">
          <div className="header">Alexander Sapountzis</div>
          <div className="meta">Software Engineer</div>
          <div className="description">
            Code monkey with delusions of artistry
          </div>
        </div>
        <div className="extra content">
          <a href="http://github.com/asap">
            <i className="icon github" />
            @asap
          </a>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
