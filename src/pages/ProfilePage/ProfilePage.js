// Extentions
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
// Styles
import './ProfilePage.css';
// Components
import { Carousel } from '../../cmps/Carousel/Carousel';

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
    }

    render() {
        if (
            !this.props.FlatStore.userLikedFlatsGetter ||
            !this.props.FlatStore.bookedByUserGetter
        ) {
            return <div>not ready</div>
        }
        return (
            <main className="main-home">
                    <div>
                        <Carousel  keyWord={'likedByUser'} />
                    </div>
                    <div>
                        <Carousel  keyWord={'bookedByUser'}/>
                    </div>
            </main>
        )
    }
}

