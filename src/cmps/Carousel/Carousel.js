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
        previews: <div>not yet</div>,
        title: <div>not yet</div>,
        cardSize: 370,
        marginSize: 10,
    }

    componentDidMount() {
        switch (this.props.keyWord) {
            case 'likedByUser':
                this.initState('userLikedFlatsGetter', 'Liked')
                break;
            case 'bookedByUser':
                this.initState('bookedByUserGetter', 'Booked')
                break;
            default:
                this.initState('flatsGetter', false)
                break;
        }
    }

    initState = (getter, word) => {
        let keyWord = this.props.keyWord[0].toUpperCase()
            + this.props.keyWord.slice(1);
        let previews = null;
        let title = null;
        let length = null;
        let previewFullSize = this.state.cardSize + this.state.marginSize;
        if (word) {
            previews = this.props.FlatStore[getter]
                .map(flat => {
                    return (
                        <div className="prv-wrapper" key={flat._id}>
                            <FlatPreview flat={flat} />
                        </div>
                    )
                })
            title = <h1>{word} Flats</h1>
            length =
                (this.props.FlatStore[getter].length * previewFullSize) -
                (2 * previewFullSize);

            if (length <= 3) {
                this.setState({ validSize: false })
            }
        } else {
            previews = this.props.FlatStore[getter].filter(flat => {
                return flat.country === this.props.keyWord;
            }).map((flat) => {
                return (
                    <div className="prv-wrapper" key={flat._id}>
                        <FlatPreview flat={flat} />
                    </div>
                )
            })

            title = <h1>Flats in {keyWord}</h1>
            length = (this.props.FlatStore[getter].filter(flat => {
                return flat.country === this.props.keyWord;
            }).length * previewFullSize) - (2 * previewFullSize);

        }

        this.setState({ carouselLength: length, title, previews });
    }

    nextCard = () => {
        let previewFullSize = this.state.cardSize + this.state.marginSize;
        if (!this.state.stopHold || !this.state.validSize) return;
        const flatPrev = document.querySelector(`.${this.props.keyWord}`);
        flatPrev.style.transition = 'transform 1s';
        if (flatPrev.style.transform === '') {
            flatPrev.style.transform = `translateX(-${previewFullSize}px)`
            this.holdTime()
        } else {
            if (flatPrev.style.transform === `translateX(-${this.state.carouselLength}px)`) return;
            let leftInt = parseInt(flatPrev.style.transform.slice(11), 10);
            leftInt += -previewFullSize;
            flatPrev.style.transform = `translateX(${leftInt}px)`
            this.holdTime()
        }
    }

    prevCard = () => {
        let previewFullSize = this.state.cardSize + this.state.marginSize;
        if (!this.state.stopHold) return;
        const flatPrev = document.querySelector(`.${this.props.keyWord}`);
        flatPrev.style.transition = 'transform 1s';
        let leftInt = parseInt(flatPrev.style.transform.slice(11), 10);
        if (flatPrev.style.transform === 'translateX(0px)') return;
        leftInt += previewFullSize;
        flatPrev.style.transform = `translateX(${leftInt}px)`
        this.holdTime()
    }

    holdTime = () => {
        this.setState({ stopHold: false })
        setTimeout(() => {
            this.setState({ stopHold: true })
        }, 300)
    }

    render() {
        if (!this.props.FlatStore.flatsGetter) return <div>not yet</div>
        let length = this.props.FlatStore.flatsGetter.length;
        return (
            <div className="carousel-component">
                <div className="btns">
                    <i onClick={this.prevCard} className="fa fa-arrow-circle-left"></i>
                    <i onClick={this.nextCard} className="fa fa-arrow-circle-right"></i>
                </div>
                <div className="carousel-wrapper">
                    {this.state.title}
                    <ul className={`carousel ${this.props.keyWord}`}>
                        {length ? this.state.previews : <div>null</div>}
                    </ul>
                </div>
            </div>
        )
    }
}