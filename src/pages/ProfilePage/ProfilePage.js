// Extentions
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
// Styles
import './ProfilePage.css';
// Components
import { FlatPreview } from '../../cmps/FlatPreview/FlatPreview';

@inject('FlatStore', 'UserStore')
@observer
export class ProfilePage extends Component {
    state = {}

    componentDidMount() {
        let user = this.props.UserStore.currUserGetter;
        let flatsIds = user.likedFlatsIds;
        let bookings = user.bookings.map(bookedFlat => {
            return bookedFlat.flatId;
        });
        this.props.FlatStore.loadLikedFlats(flatsIds);
        this.props.FlatStore.loadBookedFlats(bookings);
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
                    <div className="booked">
                        <h1>Booked Flats</h1>
                        <ul>
                            {
                                this.props.FlatStore.bookedByUserGetter
                                    .map(flat => {
                                        return <FlatPreview flat={flat} key={flat._id} />
                                    })
                            }
                        </ul>
                    </div>
                    <div className="liked">
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
                </div>
            </section>
        )
    }
}

