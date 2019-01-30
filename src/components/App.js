import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import PollAdmin from './PollAdmin';
import PollResults from './PollResults';
import PollShow from './PollShow';
import Welcome from './Welcome';
import { QuestionStore } from '../contexts/QuestionContext';

class App extends React.Component {
  render() {
    return (
      <div className="ui container">
        <QuestionStore>
          <BrowserRouter>
            <div className="ui container">
              <Header />
              <Switch>
                <Route path="/" exact component={Welcome} />
                <Route path="/admin" exact component={PollAdmin} />
                <Route path="/poll" exact component={PollShow} />
                <Route path="/results" exact component={PollResults} />
              </Switch>
            </div>
          </BrowserRouter>
        </QuestionStore>
      </div>
    );
  }
}

export default App;
