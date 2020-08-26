import React, { Component } from 'react';

export class TweetImageBlock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    openImageNewTab(base64String) {
        let newtab = window.open();
        newtab.document.body.innerHTML = "<img src='" + base64String + "'/>";
        newtab.document.title = "Image preview";
    }

    deleteImage(e) {
        e.stopPropagation();
        this.props.deleteImage(this.props.idx);
    }

    render() {
        return (
            <li className="list-group-item w-25 mr-2 thumbnail-item" onClick={() => this.openImageNewTab(this.props.base64)}>
                {
                    this.props.editPaneExpanded &&
                    <i className="fas fa-trash-alt trash-hover float-right mb-2" onClick={(e) => this.deleteImage(e)}></i>
                }
                <img src={this.props.base64} alt="thumbnail" className="img-thumbnail img-fluid w-100" />
            </li>
        );
    }
}