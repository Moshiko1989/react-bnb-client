// Extensions
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
// Components
import { TransactionModal } from '../../cmps/TransactionModal/TransactionModal';
// Styles
import './FlatPage.css';

@inject('FlatStore', 'UserStore')
@observer
export class FlatPage extends Component {
    state = {
        isModal: false,
    }

    componentDidMount() {
        var flatId = this.props.match.params.id;
        this.props.FlatStore.loadFlatById(flatId)
    }

    toggleLike = () => {
        if (!this.props.UserStore.currUserGetter) {
            this.props.history.push('/login');
            return;
        }

        let userId = this.props.UserStore.currUserGetter._id;
        this.props.UserStore.toggleLike(this.props.FlatStore.flatGetter._id);
        this.props.FlatStore.toggleLike(userId);
    }

    openModal = () => {
        if (!this.props.UserStore.currUserGetter) {
            this.props.history.push('/login');
        }
        this.setState({ isModal: true }, () => {
            document.querySelector('.modal').style.display = 'block';
        })
    }

    closeModal = () => {
        this.setState({ isModal: false })

    }

    onSubmit = (bookingDetails) => {
        bookingDetails.hostId = 'test-test-test';
        bookingDetails.guestId = this.props.UserStore.currUserGetter._id;
        bookingDetails.flatId = this.props.match.params.id;
        this.props.UserStore.bookFlat(bookingDetails);
        this.props.FlatStore.userBooking(bookingDetails);
    }

    render() {

        var flat = this.props.FlatStore.flatGetter;
        if (!flat) return <h1>Sorry, flat is not available</h1>

        const currUser = this.props.UserStore.currUserGetter

        var isFlatLiked = false;
        if (currUser) {
            isFlatLiked = currUser.likedFlatsIds.includes(flat._id);
        }

        return (
            <section className="flat-info">
                {this.state.isModal ? <TransactionModal onSubmit={this.onSubmit} closeModal={this.closeModal} /> : null}
                <div className="img-container">
                    <img className="flat-img" src={flat.imgUrl} alt="flat" />
                    <div onClick={this.toggleLike} className="heart">
                        {
                            (isFlatLiked) ?
                                <i className="fa fa-heart" aria-hidden="true" ></i>
                                :
                                <i className="fa fa-heart-o" aria-hidden="true"></i>
                        }
                    </div>
                    <i className="fa fa-plus" onClick={this.openModal}></i>
                </div>
                <div>
                    <h1>{flat.title}</h1>
                    <h3>{flat.address}</h3>
                    <h1 className="listing">About this listing</h1>
                    <div className="flat-desc">
                        <p className="flat-desc-p">{flat.desc}</p>
                    </div>
                </div>
                <div className="amenities">

                    <h1 className="align-left">Amenities</h1>


                    <ul className="detail-list">
                        <li><i className="fa fa-wifi" aria-hidden="true"></i><span> Wifi</span></li>
                        <li><i className="fa fa-television" aria-hidden="true"></i><span> TV</span></li>
                        <li><i className="fa fa-coffee" aria-hidden="true"></i><span> Breakfast</span></li>
                    </ul>



                    <ul className="detail-list">
                        <li><i className="fa fa-paw" aria-hidden="true"></i><span> Pets allowed</span></li>
                        <li><i className="fa fa-cutlery" aria-hidden="true"></i><span> Kitchen</span></li>
                        <li><i className="fa fa-laptop" aria-hidden="true"></i><span> Laptop-friendly workplace</span></li>
                    </ul>

                </div>
                <hr />
                <div className="flat-prices">

                    <h1 className="align-left">Prices</h1>

                    <ul className="detail-list">
                        <li>Per night: <span> {flat.prices.perNight}$</span></li>
                        <li>Extra people: <span> {flat.prices.extraPeople}$</span></li>
                    </ul>


                    <ul className="detail-list">
                        <li>Weekly discount: <span> {flat.prices.weeklyDiscount}%</span></li>
                        <li>Monthly discount: <span> {flat.prices.monthlyDiscount}%</span></li>
                    </ul>

                </div>
            </section>
        );
    }
}