// Extentions
import React, { Component } from 'react';
import { inject } from 'mobx-react';
import { NavLink } from 'react-router-dom';
// Components
import { Input } from '../../cmps/Input/Input';

@inject('UserStore')
export class Login extends Component {
    state = {
        userCredentials: {},
        msgClass: '',
        msgTxt: 'User or password are not valid'
    }

    handleServerResponse = () => {
        setTimeout(() => {
            if (!this.props.UserStore.currUserGetter) {
                this.setState({
                    msgClass: 'updated',
                    msgTxt: 'User or password are not valid'
                })
            } else {
                this.props.history.goBack();
            }
        }, 1000)
    }

    validate = () => {
        if (
            !this.state.userCredentials.name ||
            !this.state.userCredentials.password
        ) {
            this.setState({
                msgClass: 'updated',
                msgTxt: 'Please fill out both name and password'
            })
            return false;
        }
        return true;
    }

    submit = (ev) => {
        ev.preventDefault()
        if (!this.validate()) return;
        this.props.UserStore.loadUser(this.state.userCredentials)
        this.handleServerResponse();
    }

    onInputChange = (field, ev) => {
        const newUser = {
            ...this.state.userCredentials,
            [field]: ev.target.value,
        }
        this.setState({ userCredentials: newUser });
    }

    render() {
        let msgClass = this.state.msgClass;
        let msgTxt = this.state.msgTxt;
        return (
            <form onSubmit={this.submit} className="Login">

                <Input onChange={this.onInputChange} type="text"
                    placeholder="Name" field={"name"} />

                <Input onChange={this.onInputChange} type="password"
                    placeholder="Password" field={"password"} />

                <button className="button is-link">Log In</button>

                <NavLink to="/signup">
                    <p className="link-register">Not registered yet?</p>
                </NavLink>

                <p className={`msg ${msgClass}`} ref="msg">{msgTxt}</p>
            </form>
        )
    }
}