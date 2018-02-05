import React, { Component } from 'react';
// import { observable, action, computed , autorun } from 'mobx'
// import { FlatCard } from '../../cmps/FlatCard/FlatCard';
import { FlatPreview } from '../../cmps/FlatPreview/FlatPreview';

import { inject, observer } from 'mobx-react'

import './ProfilePage.css';

@inject('FlatStore', 'UserStore')
@observer
export class ProfilePage extends Component {
    state = {}

    componentDidMount() {
        let user = this.props.UserStore.currUserGetter;
        console.log('user: ', user);
    }

    render() {

        return (
            <section className="profile">

                <div>
                    <h1>Booked Flats</h1>
                    <ul>

                    </ul>
                    <h1>Liked Flats</h1>
                    <ul>

                    </ul>
                </div>
            </section>
        )
    }
}

