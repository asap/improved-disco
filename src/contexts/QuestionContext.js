import React from 'react';

const Context = React.createContext('questions');
const CACHE_KEY = 'MY_AWESOME_POLL_APP'; // Caching as simply as possible

export class QuestionStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: {},
    };
    this.initialState = this.state;
  }

  loadQuestionsCache() {
    const cache = localStorage.getItem(CACHE_KEY);
    if (cache) {
      return JSON.parse(cache);
    }
    return this.initialState;
  }

  onSubmitVote = questions => {
    this.setState({ questions });
    localStorage.setItem(CACHE_KEY, JSON.stringify(questions));
  };

  onSaveQuestions = questions => {
    this.setState({ questions });
    localStorage.setItem(CACHE_KEY, JSON.stringify(questions));
  };

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          onSubmitVote: this.onSubmitVote,
          onSaveQuestions: this.onSaveQuestions,
          loadQuestionsCache: this.loadQuestionsCache,
        }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
