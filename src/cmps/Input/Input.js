// Extentions
import React, { Component } from 'react';
// Styles
import './Input.css'


export class Input extends Component {

    onChange = (ev) => {
        let field = this.props.field;
        this.props.onChange(field, ev);
    }

    render() {
        let props = this.props;
        return (
            <input
                className="Input"
                onChange={this.onChange}
                type={props.type}
                placeholder={props.placeholder}
            />
            )
    }
}