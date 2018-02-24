// Extentions
import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// Styles
import "./Carousel.css";
// Components
import { FlatPreview } from "../FlatPreview/FlatPreview";
import { NoFlats } from "../NoFlats/NoFlats";

@inject("FlatStore")
@observer
export class Carousel extends Component {
  state = {
    stopHold: true,
    carouselLength: null,
    validSize: true,
    previews: <div />,
    title: <div />,
    displayCarousel: "",
    displayRight: "",
    displayLeft: "fa-hide",
    cardSize: 370,
    marginSize: 10,
    noFlats: null
  };

  componentDidMount() {
    switch (this.props.keyWord) {
      case "likedByUser":
        this.initState("userLikedFlatsGetter", "Liked");
        break;
      case "bookedByUser":
        this.initState("bookedByUserGetter", "Booked");
        break;
      default:
        this.initState("flatsGetter", false);
        break;
    }
  }

  initState = (getter, word) => {
    let keyWord =
      this.props.keyWord[0].toUpperCase() + this.props.keyWord.slice(1);

    let previews = null;
    let title = null;
    let length = null;
    let previewFullSize = this.state.cardSize + this.state.marginSize;
    if (this.props.FlatStore[getter].length) {
      if (word) {
        previews = this.props.FlatStore[getter].map(flat => {
          return (
            <div className="prv-wrapper" key={flat._id}>
              <FlatPreview history={this.props.history} flat={flat} />
            </div>
          );
        });
        title = <h1>{word} Flats</h1>;
        length =
          this.props.FlatStore[getter].length * previewFullSize -
          2 * previewFullSize;

        if (length <= 3) {
          this.setState({ validSize: false, displayRight: 'fa-hide' });
        }
      } else {
        previews = this.props.FlatStore[getter]
          .filter(flat => {
            return flat.country === this.props.keyWord;
          })
          .map(flat => {
            return (
              <div className="prv-wrapper" key={flat._id}>
                <FlatPreview history={this.props.history} flat={flat} />
              </div>
            );
          });

        title = <h1>Flats in {keyWord}</h1>;
        length =
          this.props.FlatStore[getter].filter(flat => {
            return flat.country === this.props.keyWord;
          }).length *
            previewFullSize -
          2 * previewFullSize;
      }
      this.setState({ carouselLength: length, title, previews });
    } else {
      this.setState({
        displayCarousel: "hide",
        noFlats: <NoFlats word={word} />
      });
    }
  };

  nextCard = () => {
    let previewFullSize = this.state.cardSize + this.state.marginSize;

    if (!this.state.stopHold || !this.state.validSize) return;
    if (this.state.displayLeft === "fa-hide") {
      this.setState({ displayLeft: "" });
    }

    const flatPrev = document.querySelector(`.${this.props.keyWord}`);
    flatPrev.style.transition = "transform 1s";

    if (flatPrev.style.transform === "") {
      flatPrev.style.transform = `translateX(-${previewFullSize}px)`;
      this.holdTime();
    } else {
      if (
        parseInt(flatPrev.style.transform.slice(12), 10) ===
        this.state.carouselLength - previewFullSize
      ) {
        this.setState({ displayRight: "fa-hide" });
      }
      if (
        flatPrev.style.transform ===
        `translateX(-${this.state.carouselLength}px)`
      ) {
        return;
      }
      let leftInt = parseInt(flatPrev.style.transform.slice(11), 10);
      leftInt += -previewFullSize;
      flatPrev.style.transform = `translateX(${leftInt}px)`;
      this.holdTime();
    }
  };

  prevCard = () => {
    let previewFullSize = this.state.cardSize + this.state.marginSize;

    if (!this.state.stopHold) return;
    if (this.state.displayRight === "fa-hide") {
      this.setState({ displayRight: "" });
    }

    const flatPrev = document.querySelector(`.${this.props.keyWord}`);
    flatPrev.style.transition = "transform 1s";
    let leftInt = parseInt(flatPrev.style.transform.slice(11), 10);

    if (flatPrev.style.transform === "translateX(0px)") {
      this.setState({ displayLeft: "fa-hide" });
      return;
    }

    leftInt += previewFullSize;
    if (!leftInt) {
      this.setState({ displayLeft: "fa-hide" });
    }
    flatPrev.style.transform = `translateX(${leftInt}px)`;

    this.holdTime();
  };

  holdTime = () => {
    this.setState({ stopHold: false });
    setTimeout(() => {
      this.setState({ stopHold: true });
    }, 300);
  };

  render() {
    if (!this.props.FlatStore.flatsGetter) return <div />;
    let length = this.props.FlatStore.flatsGetter.length;
    if (this.state.displayCarousel === "hide") return this.state.noFlats;
    return (
      <div className={`carousel-component ${this.state.displayCarousel}`}>
        <div className="btns">
          <i
            onClick={this.prevCard}
            className={`fa fa-arrow-circle-left ${this.state.displayLeft}`}
          />
          <i
            onClick={this.nextCard}
            className={`fa fa-arrow-circle-right ${this.state.displayRight}`}
          />
        </div>
        <div className="carousel-wrapper">
          {this.state.title}
          <ul className={`carousel ${this.props.keyWord}`}>
            {length ? this.state.previews : <div />}
          </ul>
        </div>
      </div>
    );
  }
}
