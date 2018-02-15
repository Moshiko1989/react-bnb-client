// Extentions
import React, { Component } from 'react';
import { inject } from 'mobx-react';
// Components
import { Input } from '../../cmps/Input/Input';
// Styles
// import './Register.css';
// Services
import UserService from '../../services/UserService';

@inject('UserStore')
export class Register extends Component {
    state = {
        user: null,
        msgClass: ''        
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
            this.setState({msgClass: 'updated'})
            return false;
        }
        if (user.password !== user.passwordValid) {
            this.updateMsg('Password do not match');
            this.setState({msgClass: 'updated'})
            return false;
        }
        return user;
    }

    updateMsg = (msg) => {
        this.refs.msg.innerText = msg;
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
        return (
            <form onSubmit={this.submit} className="Register">
                <Input onChange={this.onInputChange} type="text"
                    placeholder="Name" field={"name"}/>
                <Input onChange={this.onInputChange} type="password"
                    placeholder="Password" field={"password"}/>
                <Input onChange={this.onInputChange} type="password"
                    placeholder="Password" field={"passwordValid"}/>
                <Input onChange={this.onInputChange} type="email"
                    placeholder="Email" field={"email"}/>
                <button className="button is-link">Register</button>
                <p className={`msg ${msgClass}`} ref="msg">Please fill out all fields</p>
            </form>
        )
    }
}
