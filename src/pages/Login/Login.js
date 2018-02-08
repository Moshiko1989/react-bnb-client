// Extentions
import React, { Component } from 'react';
import { inject } from 'mobx-react';
import { NavLink } from 'react-router-dom';
// Styles
import './Login.css'

@inject('UserStore')
export class Login extends Component {
    state = {
        userCredentials: {
            name: '',
            password: '',
        }
    }

    handleServerResponse = () => {
        setTimeout(() => {
            if (!this.props.UserStore.currUserGetter) {
                this.updateMsg('User or password are not valid');
            } else {
                console.log(this.props.history);
                this.props.history.goBack();
            }
        }, 100)
    }

    updateMsg = (msg) => {
        this.refs.msg.innerText = msg;
        this.refs.msg.style.visibility = 'visible';
        this.refs.msg.style.opacity = '0.5';
    } 

    validate = () => {
        if (
            !this.state.userCredentials.name ||
            !this.state.userCredentials.password
        ) {
            this.updateMsg('Please fill out both name and password');
            return false;
        }
        return true;
    }

    submit = (e) => {
        e.preventDefault()
        if (!this.validate()) return;
        this.props.UserStore.loadUser(this.state.userCredentials)
        this.handleServerResponse();
    }

    onInputChange(field, ev) {
        const newUser = {
            ...this.state.userCredentials,
            [field]: ev.target.value,
        }
        this.setState({ userCredentials: newUser });
    }

    render() {
        return (
            <form onSubmit={this.submit} className="login">
                <input onChange={this.onInputChange.bind(this, 'name')} ref="name" type="text" placeholder="Name" />
                <input onChange={this.onInputChange.bind(this, 'password')} ref="password" type="password" placeholder="Password" />
                <button className="button is-link">Log In</button>
                <NavLink to="/signup">
                <p>Not registered yet?</p>
                </NavLink>
                <p className="msg" ref="msg">Please fill out both name and password</p>
            </form>
        )
    }
}