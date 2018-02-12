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
    nextCard = () => {
        if (!this.state.canMove) return;
        const elCarousel = document.querySelector('.carousel');
        if (elCarousel.style.left === '') {
            elCarousel.style.left = '-400px'
            this.setState({ canMove: false })
            setTimeout(() => {
                this.setState({ canMove: true })
            }, 1000)
        } else {
            if (elCarousel.style.left === '-4000px') return;
            let leftInt = parseInt(elCarousel.style.left, 10);
            leftInt += -400;
            elCarousel.style.left = `${leftInt}px`
            this.setState({ canMove: false })
            setTimeout(() => {
                this.setState({ canMove: true })
            }, 1000)
        }
    }

    prevCard = () => {
        if (!this.state.canMove) return;
        const elCarousel = document.querySelector('.carousel');
        let leftInt = parseInt(elCarousel.style.left, 10);
        if (elCarousel.style.left === '0px') return;
        leftInt += 400;
        elCarousel.style.left = `${leftInt}px`
        this.setState({ canMove: false })
        setTimeout(() => {
            this.setState({ canMove: true })
        }, 1000)
    }

    render() {
        return (
            <main className="main-home">
                <ul>
                    <li>
                        <Carousel  keyWord={'taiwan'}/>
                    </li>
                    <li>
                        <Carousel  keyWord={'cuba'}/>
                    </li>
                    <li>
                        <Carousel  keyWord={'poland'}/>
                    </li>
                </ul>
            </main>
        )
    }
}

