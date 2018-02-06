import React, { Component } from 'react'

import './TransactionModal.css'

export class TransactionModal extends Component {
    state = {};


    componentDidMount() {
        document.addEventListener('keyup', this.closeModal);
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
        if (field === 'bookStart' || field === 'bookEnd') {
            let arr = ev.target.value.split('-');
            let date = {
                year: arr[0],
                month: arr[1],
                day: arr[2],
            }
            this.setState({ [field]: date });
        } else if (field === 'guestCount') {
            let guestCount = ev.target.value;
            this.setState({ [field]: guestCount });
        }
    }

    updateMsg = (msg) => {
        this.refs.msg.innerText = msg;
        this.refs.msg.style.visibility = 'visible';
        this.refs.msg.style.opacity = '0.5';
    } 

    validate = () => {
        if (!this.state.bookStart || !this.state.bookEnd || !this.state.guestCount) {
            this.updateMsg('Please fill all fields');
            return;
        }

        if (+this.state.bookStart.year > +this.state.bookEnd.year) {
            this.updateMsg('Year is  not valid');          
            return;
        }

        if (+this.state.bookStart.month > +this.state.bookEnd.month) {
            this.updateMsg('Month is  not valid');      
            return;
        }

        if (+this.state.bookStart.day > +this.state.bookEnd.day) {
            this.updateMsg('Day is  not valid');           
            return;
        }

        if (+this.state.guestCount <= 0) {
            this.updateMsg('Guest count is not valid');         
            return;
        }
    }

    submitForm = (ev) => {       
        this.props.onSubmit(this.state);
        this.closeModal(ev);
    }

    render() {
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
                            <form onSubmit={(e) => e.preventDefault()}>
                                <input onChange={this.onInputChange.bind(this, 'bookStart')} type="date" />
                                <input onChange={this.onInputChange.bind(this, 'bookEnd')} type="date" />
                                <input onChange={this.onInputChange.bind(this, 'guestCount')} type="number" />
                                <p className="msg" ref="msg">MSG</p>
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