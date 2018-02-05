// Extentions
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
// Styles
import 'bulma/css/bulma.css';
import './FlatPreview.css';
// import UserStore from '../../store/UserStore';

@inject('UserStore')
@observer
export class FlatPreview extends Component {

    toggleLike = () => {

        if (!this.props.UserStore.currUserGetter) {
            this.props.history.push('/login');
            return;
        }

        // console.log(this.props.flat._id);
        this.props.UserStore.toggleLike(this.props.flat._id);
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




// // Extentions
// import React from 'react';
// import { NavLink } from 'react-router-dom';

// // Styles
// import 'bulma/css/bulma.css';
// import './FlatPreview.css';
// // import UserStore from '../../store/UserStore';

// export const FlatPreview = (props) => {

//     var toggleLike = () => {
//         if (!props.UserStore.currUserGetter) props.history.push('/login');
//         console.log(props.flat._id);
//         props.UserStore.toggleLike(props.flat._id);
//     }

//     console.log(props.UserStore.currUserGetter, !!props.flat.userLikedIds)

//     return (
//         <li className="flat-preview">
//             <div onClick={toggleLike} className="heart">
//                 {
//                     // Required changes, when server added!!!!!!!!!!!!!!!!!!!!!
//                     (props.UserStore.currUserGetter && props.flat.userLikedIds) ?
//                     <i className="fa fa-heart" aria-hidden="true" ></i>
//                     :
//                     <i className="fa fa-heart-o" aria-hidden="true"></i>
//                 }
//             </div>
//             <NavLink to={`/flat/${props.flat._id}`}>
//                 <aside className="img-container">
//                     <img src={props.flat.imgUrl} alt="flat" />
//                 </aside>
//                 <aside className="flat-txt-container">
//                     <h2 className="flat-txt">{props.flat.title}</h2>
//                     <h4 className="flat-txt">{props.flat.address}</h4>
//                 </aside>
//             </NavLink>
//         </li>
//     )
// }


