// Extentions
import React, { Component } from 'react';
import { inject } from 'mobx-react';
// Styles
import 'bulma/css/bulma.css';
import './Login.css'

@inject('UserStore')
export class Login extends Component {
    state = {
        userCredentials: {
            name: '',
            password: '',
        }
    }
    submit = (e) => {
        e.preventDefault()
        // this.props.UserStore.loadUser(this.state.userToLog)
        // console.log('user credwntials: ', this.state.userCredentials);
        this.props.UserStore.loadUser(this.state.userCredentials)
        this.props.history.goBack();      
    }
    onInputChange(field, ev) {
        // console.log(refStr, ev.target.value);
        const newUser = {
            ...this.state.userCredentials,
            [field]: ev.target.value,
        }
        this.setState({ userCredentials: newUser });
        // console.log({newUser});
        }
    
    render() {
        return (
            <form onSubmit={this.submit} className="login">
                <input onChange={this.onInputChange.bind(this, 'name')} ref="name" type="text" placeholder="Name" />
                <input onChange={this.onInputChange.bind(this, 'password')}  ref="password" type="password" placeholder="Password" />
                <button className="button is-link">Log In</button>
            </form>
        )
    }
}