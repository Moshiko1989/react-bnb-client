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
        var user = this.state.user;
        if (user.password !== user.passwordValid) {
            console.log('Password invalid');
            return;
        }
        
        this.props.UserStore.addUser(user);
        this.props.history.goBack();
        
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
                <input onChange={this.onInputChange.bind(this, 'name')} ref="name" type="text" placeholder="Name" required/>
                <input onChange={this.onInputChange.bind(this, 'password')} ref="password" type="password" placeholder="Password" required/>
                <input onChange={this.onInputChange.bind(this, 'passwordValid')} ref="passwordValid" type="password" placeholder="Password again" />
                <input onChange={this.onInputChange.bind(this, 'email')} ref="email" type="email" placeholder="Email" required/>
                <button className="button is-link">Register</button>
            </form>
        )
    }
}
