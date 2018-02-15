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
        msgClass: ''
    }

    handleServerResponse = () => {
        setTimeout(() => {
            if (!this.props.UserStore.currUserGetter) {
                this.updateMsg('User or password are not valid');
                this.setState({msgClass: 'updated'})
            } else {
                this.props.history.goBack();
            }
        }, 100)
    }

    updateMsg = (msg) => {
        this.refs.msg.innerText = msg;
    }

    validate = () => {
        if (
            !this.state.userCredentials.name ||
            !this.state.userCredentials.password
        ) {
            this.updateMsg('Please fill out both name and password');
            this.setState({msgClass: 'updated'})
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

    onInputChange = (field, ev) => {
        const newUser = {
            ...this.state.userCredentials,
            [field]: ev.target.value,
        }
        this.setState({ userCredentials: newUser });
    }

    render() {
        let msgClass = this.state.msgClass;
        return (
            <form onSubmit={this.submit} className="Login">
                
                <Input onChange={this.onInputChange} type="text"
                    placeholder="Name" field={"name"}/>
                
                <Input onChange={this.onInputChange} type="password" 
                    placeholder="Password" field={"password"}/>

                <button className="button is-link">Log In</button>

                <NavLink to="/signup">
                    <p className="link-register">Not registered yet?</p>
                </NavLink>
                
                <p className={`msg ${msgClass}`} ref="msg">Please fill out both name and password</p>
            </form>
        )
    }
}