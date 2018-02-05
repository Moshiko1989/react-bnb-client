// Extentions
import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
// Styles
// import 'bulma/css/bulma.css';
import './HomePage.css';
// Components
import { FlatPreview } from '../../cmps/FlatPreview/FlatPreview';

@inject('FlatStore', 'UserStore')
@observer
export class HomePage extends Component {
    componentWillMount() {
        // console.log(this.props.history)
        this.props.FlatStore.loadFlats();
    }
    render() {
        return (
            <main className="main-home">
                <ul>
                    {
                        this.props.FlatStore.flatsGetter.map((flat) => {
                         return <FlatPreview key={flat._id} flat={flat}
                                        history={this.props.history}/>                                  
                        })
                    }
                </ul>
            </main>
        )
    }
}

