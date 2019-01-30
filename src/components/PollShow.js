import React from 'react';
import { Link } from 'react-router-dom';
import PollShowQuestionCard from './show/PollShowQuestionCard';
import QuestionContext from '../contexts/QuestionContext';

class PollShow extends React.Component {
  static contextType = QuestionContext;

  constructor(props) {
    super(props);
    this.state = {
      questions: {},
      message: '',
    };
  }

  componentDidMount() {
    const questionsCache = this.context.loadQuestionsCache();
    if (questionsCache) {
      this.setState({
        questions: this.context.loadQuestionsCache(),
      });
    }
  }

  handleAnswerQuestion = (answerIndex, answer, questionKey) => {
    const updatedQuestions = { ...this.state.questions };
    updatedQuestions[questionKey].response = answer;
    this.setState({
      questions: updatedQuestions,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.validateForm()) {
      this.context.onSubmitVote(this.state.questions);
      this.setState({
        message: 'success',
      });
    } else {
      this.setState({
        message: 'fail',
      });
    }
  };

  validateForm() {
    return Object.keys(this.state.questions).every(
      questionKey =>
        typeof this.state.questions[questionKey].response !== 'undefined',
    );
  }

  renderMessageSuccess() {
    return (
      <div className="ui segment">
        <h2 className="ui center aligned icon header">
          <i className="circular hand spock outline icon" />
          <div className="header">Thank you!</div>
        </h2>
      </div>
    );
  }

  renderMessageEmpty() {
    return (
      <div className="ui segment">
        <h2 className="ui center aligned icon header">
          <i className="circular meh outline icon" />
          <div className="header">Sorry, nothing to see here</div>
          <Link to="/admin">
            <button className="ui button primary">Go to Admin</button>
          </Link>
        </h2>
      </div>
    );
  }

  renderMessageFail() {
    return (
      <div className="ui segment">
        <h2 className="ui center aligned icon header">
          <i className="circular frown outline icon" />
          <div className="header">Sorry, you missed something</div>
          <button
            className="ui button primary"
            onClick={() => this.setState({ message: '' })}>
            Try again
          </button>
        </h2>
      </div>
    );
  }

  renderQuestions() {
    const questions = Object.keys(this.state.questions).map(
      key => this.state.questions[key],
    );
    return questions.map((question, index) => (
      <PollShowQuestionCard
        key={question.id}
        question={question}
        onAnswerQuestion={this.handleAnswerQuestion}
      />
    ));
  }

  renderPollForm() {
    return (
      <div className="ui segment">
        <form onSubmit={this.handleSubmit}>
          <div className="ui form">
            {this.renderQuestions()}
            <button className="ui button primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }

  render() {
    if (Object.keys(this.state.questions).length === 0) {
      return this.renderMessageEmpty();
    } else if (this.state.message === 'success') {
      return this.renderMessageSuccess();
    } else if (this.state.message === 'fail') {
      return this.renderMessageFail();
    } else {
      return this.renderPollForm();
    }
  }
}

export default PollShow;
