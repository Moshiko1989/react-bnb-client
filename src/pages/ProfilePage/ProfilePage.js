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
        let flatsIds = user.likedFlatsIds;
        let bookedFlatsIds = user.bookedFlatsIds.map(bookedFlat => {
            return bookedFlat.flatId;
        });
        this.props.FlatStore.loadLikedFlats(flatsIds);
        this.props.FlatStore.loadBookedFlats(bookedFlatsIds);
        // let likedFlats = this.props.UserStore.currUserGetter.userLikedIds;
    }

    render() {
        if (
            !this.props.FlatStore.userLikedFlatsGetter ||
            !this.props.FlatStore.bookedByUserGetter
        ) {
            return <div>not ready</div>
        }
        return (
            <section className="profile">

                <div>
                    <h1>Booked Flats</h1>
                    <ul>
                        {
                            this.props.FlatStore.bookedByUserGetter
                                .map(flat => {
                                    return <FlatPreview flat={flat} key={flat._id} />
                                })
                        }
                    </ul>
                    <h1>Liked Flats</h1>
                    <ul>
                        {
                            this.props.FlatStore.userLikedFlatsGetter
                                .map(flat => {
                                    return <FlatPreview flat={flat} key={flat._id} />
                                })
                        }
                    </ul>
                </div>
            </section>
        )
    }
}

