// Extentions
import React, { Component } from 'react';
import { inject } from 'mobx-react';
// Will be used synchronously
import UserService from '../../services/UserService';
// Style
import 'bulma/css/bulma.css';
import './Register.css';

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
        console.log('user is: ', user);
        if (user.password !== user.passwordValid) {
            console.log('Password invalid');
            return;
        }
        this.props.UserStore.addUser(user);
        this.props.history.goBack();
        
    }
    // onInputChange = (field) => {
    //     return (e) => {
    //         const newUser = {
    //             ...this.state.user,
    //             [field]: e.target.value
    //         }
    //         this.setState({ user: newUser })
    //         // console.log(this.state.user)
    //     }
    // }

    onInputChange = (par, ev) => {
        // console.log('this.refs[par]: ', this.refs[par])
        const newUser = {
            ...this.state.user,
            [par]: ev.target.value
        };

        // console.log('this.refs[par]: ', this.refs[par])
        // console.log('ev.target.value: ', ev.target.value)
        // console.log('newUser: ', newUser)

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
                {/* <input onChange={this.onInputChange('name')} type="text" placeholder="Name" />
                <input onChange={this.onInputChange('passWord')} type="password" placeholder="Password" />
                <input  type="password" placeholder="password verification" />
                <input onChange={this.onInputChange('email')} type="email" placeholder="Email" />
                <button className="button is-link">Register</button> */}
            </form>
        )
    }
}
