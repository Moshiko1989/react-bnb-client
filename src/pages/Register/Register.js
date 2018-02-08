// Extentions
import React, { Component } from 'react';
import { inject } from 'mobx-react';
// Styles
import './Register.css';
// Services
import UserService from '../../services/UserService';

@inject('UserStore')
export class Register extends Component {
    state = {
        user: null,
    }
    componentDidMount() {
        this.setState({ user: UserService.getEmptyUser() });
    }
    submit = (e) => {
        e.preventDefault();
        let user = this.validate();
        if (!user) {
            return;
        } else {
            this.props.UserStore.addUser(user);
        }
        this.props.history.goBack();
    }

    validate = () => {
        var user = this.state.user;

        if (
            !user.name ||
            !user.password ||
            !user.email
        ) {
            this.updateMsg('Please fill out all fields');
            return false;
        }
        if (user.password !== user.passwordValid) {
            this.updateMsg('Passwords do not match');
            return false;
        }
        return user;
    }

    updateMsg = (msg) => {
        this.refs.msg.innerText = msg;
        this.refs.msg.style.visibility = 'visible';
        this.refs.msg.style.opacity = '0.5';
    }

    onInputChange = (par, ev) => {
        const newUser = {
            ...this.state.user,
            [par]: ev.target.value
        };
        this.setState({ user: newUser });
    }

    render() {
        if (!this.state.user) return <div>no user</div>
        return (
            <form onSubmit={this.submit} className="register">
                <input onChange={this.onInputChange.bind(this, 'name')} ref="name" type="text" placeholder="Name" />
                <input onChange={this.onInputChange.bind(this, 'password')} ref="password" type="password" placeholder="Password" />
                <input onChange={this.onInputChange.bind(this, 'passwordValid')} ref="passwordValid" type="password" placeholder="Password again" />
                <input onChange={this.onInputChange.bind(this, 'email')} ref="email" type="email" placeholder="Email"/>
                <button className="button is-link">Register</button>
                <p className="msg" ref="msg">Please fill out all fields</p>
            </form>
        )
    }
}
