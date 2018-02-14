// Extentions
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
// Styles
import './HomePage.css';
// Components
import { Carousel } from '../../cmps/Carousel/Carousel';

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
        if (!this.props.FlatStore.flatsGetter) return <div>not ready</div>
        return (
            <main className="main-home" >
                    <div className="home-li">
                        <Carousel  keyWord={'taiwan'}/>
                    </div >
                    <div className="home-li">
                        <Carousel  keyWord={'cuba'}/>
                    </div>
                    <div className="home-li">
                        <Carousel  keyWord={'poland'}/>
                    </div>
            </main>
        )
    }
}

