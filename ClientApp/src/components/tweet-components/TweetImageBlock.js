import React, { Component } from 'react';

export class TweetImageBlock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    render() {
        return (
            <li className="list-group-item w-25 mr-2 thumbnail-item">
                {
                    this.props.editPaneExpanded &&
                    <i className="fas fa-trash-alt trash-hover float-right mb-2"></i>
                }
                <img src={this.props.base64} alt="thumbnail" className="img-thumbnail img-fluid w-100" />
            </li>
        );
    }
}