// Extentions
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
// Styles
import 'bulma/css/bulma.css';
import './FlatPreview.css';

@inject('UserStore', 'FlatStore')
@observer
export class FlatPreview extends Component {

    toggleLike = () => {

        if (!this.props.UserStore.currUserGetter) {
            this.props.history.push('/login');
            return;
        }

        let userId = this.props.UserStore.currUserGetter._id;
        // console.log(this.props.flat._id);
        this.props.UserStore.toggleLike(this.props.flat._id);
        this.props.FlatStore.toggleLike(userId, this.props.flat);
    }

    render() {
        const currUser = this.props.UserStore.currUserGetter

        var isFlatLiked = false;
        if (currUser) {
            // console.log(currUser.likedFlatsIds, this.props.flat._id)
            isFlatLiked = currUser.likedFlatsIds.includes(this.props.flat._id);
            // console.log(isFlatLiked)
        }

        // console.log(this.props.flat.userLikedIds)
        return (
            <li className="flat-preview">
                <div onClick={this.toggleLike} className="heart">
                    {
                        // Required changes, when server added!!!!!!!!!!!!!!!!!!!!!
                        /* (isFlatLiked && this.props.flat.userLikedIds) ? */ 
                            (isFlatLiked) ?
                            <i className="fa fa-heart" aria-hidden="true" ></i>
                            :
                            <i className="fa fa-heart-o" aria-hidden="true"></i>
                    }
                </div>
                <NavLink to={`/flat/${this.props.flat._id}`}>
                    <aside className="img-container">
                        <img src={this.props.flat.imgUrl} alt="flat" />
                    </aside>
                    <aside className="flat-txt-container">
                        <h2 className="flat-txt">{this.props.flat.title}</h2>
                        <h4 className="flat-txt">{this.props.flat.address}</h4>
                    </aside>
                </NavLink>
            </li>
        )
    }
}