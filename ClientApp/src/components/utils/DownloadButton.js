import React, { Component } from 'react';
import fileDownload from 'js-file-download';

export class DownloadButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            dataIsLoaded: false
        }
    }

    async componentDidMount() {
    }

    async downloadData() {
        const data = await this.props.asyncGetData();
        await fileDownload(data, this.props.fileName, this.props.contentType);
    }
    renderInitialButton() {
        return (
            <p className="mb-3" >
                <button className="btn btn-dark" onClick={() => this.downloadData()}>
                    <i className="fas fa-download"></i> {this.props.buttonName}
        </button>
            </p>
        )
    }

    render() {
        return (
            this.renderInitialButton()
        );
    }
}