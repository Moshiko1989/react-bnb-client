// Extenions
import React, { Component } from 'react'
// Components
import { Input } from '../Input/Input';
// Styles
import './TransactionModal.css'

export class TransactionModal extends Component {
    state = {
        bookingDetails: {},
        msgClass: '',
        msgTxt: ''
    };

    componentDidMount() {
        document.addEventListener('keyup', this.closeModal);
        document.addEventListener('scroll', ev => {
            ev.preventDefault()
        }, false);
    }
    componentWillUnmount() {
        document.removeEventListener('keyup', this.closeModal);
    }
    closeModal = (ev) => {
        if (!ev.keyCode || ev.keyCode === 27) {
            document.querySelector('.modal').style.display = 'none';
            this.props.closeModal();
        }
    }

    onInputChange = (field, ev) => {
        let fieldValue = null;

        if (field === 'bookStart' || field === 'bookEnd') {
            let arr = ev.target.value.split('-');
            fieldValue = {
                year: arr[0],
                month: arr[1],
                day: arr[2],
            }
        } else if (field === 'guestCount') {
            fieldValue = ev.target.value;
        }
        const bookingDetails = {
            ...this.state.bookingDetails,
            [field]: fieldValue
        }
        this.setState({ bookingDetails })
    }

    validate = () => {
        let bookingDetails = this.state.bookingDetails;

        if (!bookingDetails.bookStart || !bookingDetails.bookEnd || !bookingDetails.guestCount) {
            this.setState({
                msgClass: 'updated',
                msgTxt: 'Please fill all fields'
            })
            return false;
        }

        if (+bookingDetails.bookStart.year > +bookingDetails.bookEnd.year) {
            this.setState({
                msgClass: 'updated',
                msgTxt: 'Year is  not valid'
            })
            return false;
        }

        if (+bookingDetails.bookStart.month > +bookingDetails.bookEnd.month) {
            this.setState({
                msgClass: 'updated',
                msgTxt: 'Month is  not valid'
            })
            return false;
        }

        if (+bookingDetails.bookStart.day > +bookingDetails.bookEnd.day) {
            this.setState({
                msgClass: 'updated',
                msgTxt: 'Day is  not valid'
            })
            return false;
        }

        if (+bookingDetails.guestCount <= 0) {
            this.setState({
                msgClass: 'updated',
                msgTxt: 'Guest count is not valid'
            })
            return false;
        }
        return true;
    }

    submitForm = (ev) => {
        if (!this.validate()) return;

        this.props.onSubmit(this.state.bookingDetails);
        this.closeModal(ev);
    }

    render() {
        let msgClass = this.state.msgClass;
        let msgTxt = this.state.msgTxt
        return (
            <div>
                <div className="modal">
                    <div onClick={this.closeModal} className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Book this flat:</p>
                            <button className="delete" onClick={this.closeModal} aria-label="close"></button>
                        </header>
                        <section className="modal-card-body">
                            <form onSubmit={(e) => e.preventDefault()} className="TransactionModal">

                                <p>Date Start:</p>
                                <Input onChange={this.onInputChange} type="date" field={"bookStart"} />

                                <p>Date end:</p>
                                <Input onChange={this.onInputChange} type="date" field={"bookEnd"} />

                                <p>How many will you be?</p>
                                <Input onChange={this.onInputChange} type="number" field={"guestCount"} />

                                <p className={`msg ${msgClass}`} ref="msg">{msgTxt}</p>
                            </form>
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-success" onClick={this.submitForm}>Save changes</button>
                            <button className="button cancel-modal" onClick={this.closeModal}>Cancel</button>
                        </footer>
                    </div>
                </div>
            </div>
        )
    }
}