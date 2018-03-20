// Extentions
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
// Styles
import './ProfilePage.css';
// Components
import { Carousel } from '../../cmps/Carousel/Carousel';
import { Loader } from '../../cmps/Loader/Loader';

@inject('FlatStore', 'UserStore')
@observer
export class ProfilePage extends Component {
    state = {}

    componentDidMount() {
        let user = this.props.UserStore.currUserGetter;
        let likedFlatsIds = user.likedFlatsIds;
        let bookingFlatsIds = user.bookings.map(bookedFlat => {
            return bookedFlat.flatId;
        });
        this.props.FlatStore.loadLikedFlats(likedFlatsIds);
        this.props.FlatStore.loadBookedFlats(bookingFlatsIds);
    }

    render() {
        if (
            !this.props.FlatStore.userLikedFlatsGetter ||
            !this.props.FlatStore.bookedByUserGetter
        ) {
            return <Loader/>
        }
        return (
            <main className="main-home">
                    <div>
                        <Carousel history={this.props.history} keyWord={'likedByUser'} />
                    </div>
                    <div>
                        <Carousel history={this.props.history} keyWord={'bookedByUser'}/>
                    </div>
            </main>
        )
    }
}

