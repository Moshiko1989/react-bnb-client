// Extentions
import React, { Component } from 'react';
import { inject } from 'mobx-react';

// Import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Visual
import './App.css';
// import {Icon} from 'react-fa'

// Pages
import { HomePage } from '../src/pages/HomePage/HomePage';
// import { SignUpPage } from './pages/SignUpPage/SignUpPage';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { FlatPage } from '../src/pages/Flatpage/FlatPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';

// Components
import { Header } from './cmps/Header/Header';
import { Footer } from './cmps/Footer/Footer';


@inject('FlatStore', 'UserStore')
class App extends Component {
  componentDidMount() {
    this.props.FlatStore.loadFlats()
  }
  render() {
    var tests = this.props.FlatStore.flatsGetter.map(flat => <p>{flat._id}</p>)
    return (
      <div className="App">
        <Router>
          <div className="outer-wrapper">
            <div className="switch-header">
              <Header props={this.props} />
              {tests}
                <Switch className="switch">
                  <Route exact path="/flat/:id" render={(props) => <FlatPage {...props} />}></Route>
                  <Route path="/signup" component={Register} />
                  <Route path="/login" component={Login} />
                  <Route path="/profile" component={ProfilePage} />
                  <Route exact path="/" render={(props) => <HomePage {...props} />}></Route>
                </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </div >
    );
  }
}

export default App;
