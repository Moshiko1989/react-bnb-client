// Extentions
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
// Styles
import './HomePage.css';
// Components
import { Carousel } from '../../cmps/Carousel/Carousel';
import { Loader } from '../../cmps/Loader/Loader';

@inject('FlatStore')
@observer
export class HomePage extends Component {
    state = {
        canMove: true
    }
    componentWillMount() {
        this.props.FlatStore.loadFlats();
    }

    render() {
        if (!this.props.FlatStore.flatsGetter) return <Loader/>
        return (
            <main className="main-home" >
                    <div className="home-li">
                        <Carousel history={this.props.history} keyWord={'taiwan'}/>
                    </div >
                    <div className="home-li">
                        <Carousel history={this.props.history} keyWord={'cuba'}/>
                    </div>
                    <div className="home-li">
                        <Carousel history={this.props.history} keyWord={'poland'}/>
                    </div>
            </main>
        )
    }
}

