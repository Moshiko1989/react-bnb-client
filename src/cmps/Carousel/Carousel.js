// Extentions
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
// Styles
import './Carousel.css';
// Components
import { FlatPreview } from '../FlatPreview/FlatPreview';


@inject('FlatStore')
@observer
export class Carousel extends Component {
    state = {
        canMove: true
    }

    holdTime = () => {
        this.setState({ canMove: false })
        setTimeout(() => {
            this.setState({ canMove: true })
        }, 650)
    }

    nextCard = () => {
        if (!this.state.canMove) return;
        const elCarousel = document.querySelector('.carousel');
        if (elCarousel.style.left === '') {
            elCarousel.style.left = '-400px'
            this.holdTime()
        } else {
            if (elCarousel.style.left === '-4000px') return;
            let leftInt = parseInt(elCarousel.style.left, 10);
            leftInt += -400;
            elCarousel.style.left = `${leftInt}px`
            this.holdTime()
        }
    }

    prevCard = () => {
        if (!this.state.canMove) return;
        const elCarousel = document.querySelector('.carousel');
        let leftInt = parseInt(elCarousel.style.left, 10);
        if (elCarousel.style.left === '0px') return;
        leftInt += 400;
        elCarousel.style.left = `${leftInt}px`
        this.holdTime()
    }


    render() {
        return (
            <content>
                <div className="btns">
                    <button onClick={this.nextCard}>+</button>
                    <button onClick={this.prevCard}>-</button>
                </div>
                <ul className="carousel">
                    {
                        this.props.FlatStore.flatsGetter.map((flat) => {
                            return <FlatPreview key={flat._id} flat={flat}
                                history={this.props.history} />
                        })
                    }
                </ul>
            </content>
        )
    }
}