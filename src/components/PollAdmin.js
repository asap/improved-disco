import uuidv4 from 'uuid/v4';
import React from 'react';
import { Link } from 'react-router-dom';
import PollAdminQuestionCard from './admin/PollAdminQuestionCard';
import QuestionContext from '../contexts/QuestionContext';

class PollAdmin extends React.Component {
  static contextType = QuestionContext;

  constructor(props) {
    super();
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

  handleClickAddQuestionCard = e => {
    e.preventDefault();

    // Random ID for new question
    const quid = uuidv4();
    const newQuestion = {
      [quid]: {
        id: quid,
        question: '',
        answers: [''],
      },
    };

    this.setState({
      questions: { ...this.state.questions, ...newQuestion },
    });
  };

  handleClickDeleteQuestionCard = (key, e) => {
    e.preventDefault();
    const newState = { ...this.state.questions };
    delete newState[key];
    this.setState({
      questions: newState,
    });
  };

  handleQuestionChangeText = (key, question) => {
    const newState = { ...this.state.questions };
    newState[key].question = question;

    this.setState({
      questions: newState,
    });
  };

  handleChangeAnswerText = (answerIndex, answerText, questionKey) => {
    const newState = { ...this.state.questions };

    newState[questionKey].answers[answerIndex] = answerText;

    this.setState({
      questions: newState,
    });
  };

  handleQuestionAddAnswer = (e, questionKey) => {
    e.preventDefault();
    const newState = { ...this.state.questions };

    newState[questionKey].answers = newState[questionKey].answers.concat('');

    this.setState({
      questions: newState,
    });
  };

  handleQuestionRemoveAnswer = (answerIndex, e, questionKey) => {
    e.preventDefault();

    const newState = { ...this.state.questions };
    const newAnswers = [...newState[questionKey].answers];
    newAnswers.splice(answerIndex, 1);

    newState[questionKey].answers = newAnswers;

    this.setState({
      questions: newState,
    });
  };

  handleSubmitForm = e => {
    e.preventDefault();

    // Let's make sure we didn't accidentally add a blank answer
    const sanitizedQuestions = { ...this.state.questions };
    Object.keys(sanitizedQuestions).forEach(question => {
      sanitizedQuestions[question].answers = [
        ...sanitizedQuestions[question].answers.filter(Boolean),
      ];
    });

    this.context.onSaveQuestions(this.state.questions);
    this.setState({
      message: 'success',
    });
  };

  renderCards() {
    const questions = Object.keys(this.state.questions).map(
      key => this.state.questions[key],
    );
    return questions.map(question => (
      <PollAdminQuestionCard
        isDeleteEnabled={questions.length > 1}
        key={question.id}
        id={question.id}
        question={question.question}
        answers={question.answers}
        onClickDeleteQuestionCard={e =>
          this.handleClickDeleteQuestionCard(question.id, e)
        }
        onQuestionChangeText={e =>
          this.handleQuestionChangeText(question.id, e)
        }
        onChangeAnswerText={this.handleChangeAnswerText}
        onClickQuestionAddAnswer={this.handleQuestionAddAnswer}
        onClickQuestionRemoveAnswer={this.handleQuestionRemoveAnswer}
      />
    ));
  }

  renderMessage() {
    return (
      <div className="ui message container">
        <button
          className="ui button right floated circular icon compact mini"
          onClick={e => this.setState({ message: '' })}>
          <i className="icon close" />
        </button>
        Poll updated. <Link to="/poll">View Poll</Link>
      </div>
    );
  }

  render() {
    return (
      <div className="ui segment">
        <h1>Admin</h1>
        {this.state.message && this.renderMessage()}
        <form onSubmit={this.handleSubmitForm}>
          <div className="ui equal width form">
            {this.renderCards()}
            <div className="ui container">
              <button className="ui primary right floated button">
                Publish
              </button>
              <button
                className="ui button"
                onClick={this.handleClickAddQuestionCard}>
                Add Question
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default PollAdmin;
