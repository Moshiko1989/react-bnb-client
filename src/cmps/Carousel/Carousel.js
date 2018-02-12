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
        stopHold: true,
        carouselLength: null,
        validSize: true,
        previews: <div>previews</div>,
        title: <div>title</div>
    }

    componentDidMount() {
        var keyWord = this.props.keyWord[0].toUpperCase()
            + this.props.keyWord.slice(1);
        let previews = null;
        let title = null;
        let length = null;

        switch (this.props.keyWord) {

            case 'likedByUser':

                previews = this.props.FlatStore.userLikedFlatsGetter
                    .map(flat => {
                        return <div className={this.props.keyWord} key={flat._id}><FlatPreview flat={flat} /></div>
                    })
                title = <h1>Liked Flats</h1>
                length = (this.props.FlatStore.userLikedFlatsGetter.length * 410) - 820;

                if (length <= 3) {
                    this.setState({ validSize: false })
                }

                this.setState({ carouselLength: length, title, previews });
                break;

            case 'bookedByUser':

                previews = this.props.FlatStore.bookedByUserGetter
                    .map(flat => {
                        return <div className={this.props.keyWord} key={flat._id}><FlatPreview flat={flat} /></div>
                    })
                title = <h1>Booked Flats</h1>
                length = (this.props.FlatStore.bookedByUserGetter.length * 410) - 820;

                if (length <= 3) {
                    this.setState({ validSize: false })
                }

                this.setState({ carouselLength: length, title, previews });
                break;

            default:
                previews = this.props.FlatStore.flatsGetter.filter(flat => {
                    return flat.country === this.props.keyWord;
                }).map((flat) => {
                    return <div className={this.props.keyWord} key={flat._id}><FlatPreview flat={flat} /></div>
                })

                title = <h1>Flats in {keyWord}</h1>
                length = (this.props.FlatStore.flatsGetter.filter(flat => {
                    return flat.country === this.props.keyWord;
                }).length * 410) - 820;

                this.setState({ carouselLength: length, title, previews });
                break;
        }
    }

    nextCard = () => {
        if (!this.state.stopHold || !this.state.validSize) return;
        const flatPrevs = document.querySelectorAll(`.${this.props.keyWord}`);
        flatPrevs.forEach(flatPrev => {
            flatPrev.style.transition = 'transform 1s';
            if (flatPrev.style.transform === '') {
                flatPrev.style.transform = 'translateX(-410px)'
                this.holdTime()
            } else {
                if (flatPrev.style.transform === `translateX(-${this.state.carouselLength}px)`) return;
                let leftInt = parseInt(flatPrev.style.transform.slice(11), 10);
                leftInt += -410;
                flatPrev.style.transform = `translateX(${leftInt}px)`
                this.holdTime()
            }
        });
    }

    prevCard = () => {
        if (!this.state.stopHold) return;
        const flatPrevs = document.querySelectorAll(`.${this.props.keyWord}`);
        flatPrevs.forEach(flatPrev => {
            flatPrev.style.transition = 'transform 1s';
            let leftInt = parseInt(flatPrev.style.transform.slice(11), 10);
            if (flatPrev.style.transform === 'translateX(0px)') return;
            leftInt += 410;
            flatPrev.style.transform = `translateX(${leftInt}px)`
            this.holdTime()
        })
    }

    holdTime = () => {
        this.setState({ stopHold: false })
        setTimeout(() => {
            this.setState({ stopHold: true })
        }, 300)
    }

    render() {
        return (
            <content className="carousel-wrapper">
                <div className="btns">
                    <i onClick={this.prevCard} className="fa fa-arrow-circle-left"></i>
                    <i onClick={this.nextCard} className="fa fa-arrow-circle-right"></i>
                </div>
                {this.state.title}
                <ul className={`carousel`}>
                    {this.state.previews}
                </ul>
            </content>
        )
    }
}