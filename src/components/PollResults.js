import React from 'react';
import PollResultsQuestionCard from './results/PollResultsQuestionCard';
import QuestionContext from '../contexts/QuestionContext';

class PollResults extends React.Component {
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

  renderQuestions() {
    const questions = Object.keys(this.state.questions).map(
      key => this.state.questions[key],
    );

    if (questions.length > 0) {
      return questions.map((question, index) => (
        <PollResultsQuestionCard key={index} question={question} />
      ));
    }
    return <div className="ui message">No results yet</div>;
  }

  render() {
    return (
      <div className="ui segment">
        <h1>Results</h1>
        <div className="ui very relaxed divided list">
          {this.renderQuestions()}
        </div>
      </div>
    );
  }
}

export default PollResults;
