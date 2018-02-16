// Extentions
import React, { Component } from 'react';
import { inject } from 'mobx-react';
// Components
import { Input } from '../../cmps/Input/Input';
// Services
import UserService from '../../services/UserService';

@inject('UserStore')
export class Register extends Component {
    state = {
        user: null,
        msgClass: '',
        msgTxt: 'Please fill out all fields'
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
            this.setState({
                msgClass: 'updated',
                msgTxt: 'Please fill out all fields'
            })
            return false;
        }
        if (user.password !== user.passwordValid) {
            this.setState({
                msgClass: 'updated',
                msgTxt: 'Password do not match'
            })
            return false;
        }
        return user;
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
        let msgClass = this.state.msgClass;
        let msgTxt = this.state.msgTxt;
        return (
            <form onSubmit={this.submit} className="Register">
                <Input onChange={this.onInputChange} type="text"
                    placeholder="Name" field={"name"} />
                <Input onChange={this.onInputChange} type="password"
                    placeholder="Password" field={"password"} />
                <Input onChange={this.onInputChange} type="password"
                    placeholder="Password" field={"passwordValid"} />
                <Input onChange={this.onInputChange} type="email"
                    placeholder="Email" field={"email"} />
                <button className="button is-link">Register</button>
                <p className={`msg ${msgClass}`} ref="msg">{msgTxt}</p>
            </form>
        )
    }
}
