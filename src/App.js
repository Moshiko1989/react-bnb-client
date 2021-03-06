// Extentions
import React, { Component } from 'react';
import { inject } from 'mobx-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Styles
import './App.css';
import 'bulma/css/bulma.css';
// Pages
import { HomePage } from '../src/pages/HomePage/HomePage';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { FlatPage } from '../src/pages/Flatpage/FlatPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
// Components
import { Header } from './cmps/Header/Header';
import { Footer } from './cmps/Footer/Footer';

@inject('FlatStore', 'UserStore')
class App extends Component {
  state = {
    scroll: ''
  }
  componentDidMount() {
    this.props.FlatStore.loadFlats();
  }

  toggleScroll = () => {
    if (!this.state.scroll) {
      this.setState({scroll: 'no-scroll'})
    } else {
      this.setState({scroll: ''})
    }
  }

  render() {
    return (
        <div className={`App ${this.state.scroll}`} ref="App">
          <Router>
            <div className="outer-wrapper">
              <div className="switch-header">
                <Header props={this.props} />
                  <Switch className="switch">
                    <Route exact path="/flat/:id" render={props => <FlatPage {...props} toggleScroll={this.toggleScroll}/>}></Route>
                    <Route path="/signup" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/profile" component={ProfilePage} />
                    <Route exact path="/" render={props => <HomePage {...props} />}></Route>
                  </Switch>
              </div>
              <Footer/>
            </div>
          </Router>
        </div >
        )
  }
}

export default App;
