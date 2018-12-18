import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { SUCCESS as successColor, DANGER as dangerColor, DORMANT as dormantColor } from '../../util/colors';
import { getDict } from '../I18n';

const url = 'https://s3.console.aws.amazon.com/s3/buckets/carlisle-portal/dev/uploads/';
const defaultState = {
  acceptedFiles: [],
  rejectedFiles: [],
};

class DropzoneWrapper extends React.Component {
  static propTypes = {
    // success: PropTypes.func.isRequired,
    // cancel: PropTypes.func.isRequired,
    buttonOnly: PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this.state = defaultState;
    this.onDrop = this.onDrop.bind(this);
    this.onClearFiles = this.onClearFiles.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.acceptedFiles.length !== this.state.acceptedFiles.length) {
      console.log(this.state.acceptedFiles);
    }
  }

  onDrop(acceptedFiles, rejectedFiles) {
    this.setState({
      ...this.state,
      acceptedFiles: [...this.state.acceptedFiles, ...acceptedFiles],
      rejectedFiles: [...this.state.rejectedFiles, ...rejectedFiles],
    });
  }

  onClearFiles() {
    this.setState(defaultState);
    console.log(this.state);
  }

  deleteFile(deleteIndex) {
    this.setState({
      ...this.state,
      acceptedFiles: this.state.acceptedFiles.filter((file, index) => deleteIndex !== index),
    });
  }

  render() {
    const containerStyle = {
      padding: this.props.buttonOnly ? '' : '12px',
      textAlign: this.props.buttonOnly ? 'right' : 'center',
      cursor: 'pointer',
    };
    const iconStyle = {
      color: successColor,
      fontSize: '75px',
    };
    const iconTextStyle = {
      color: dormantColor,
    };
    const wordingBoxStyle = {
      border: '1px solid black',
      background: '#dadada',
      padding: '5px',
    };
    const closeIconStyle = {
      color: dangerColor,
      cursor: 'pointer',
      marginLeft: '10px',
    };

    return (
      <div>
        <Dropzone onDrop={this.props.onDrop} style={containerStyle}>
          <div>
            <span className={this.props.buttonOnly ? 'hide' : ''}>
              <i className="fas fa-file-upload" style={iconStyle} />
              <span style={iconTextStyle}>
                <p style={{ marginBottom: 0 }}>{getDict('dropzone.dragFilesHere')}</p>
                <p>- or -</p>
              </span>
            </span>
            <p><span style={wordingBoxStyle}>{getDict('dropzone.selectFile')}</span></p>
          </div>
        </Dropzone>
        {/*
          this.state.acceptedFiles.map((file, index) => {
            return (
              <div key={'dropzone-file' + index}>
                <a href={file.preview} target="_blank">
                  <img src={file.preview} />
                </a>
                <p style={{ textAlign: 'center' }}>
                  <a href={file.preview} target="_blank">{file.name}</a>
                  <i className="fas fa-times-circle" style={closeIconStyle} onClick={() => this.deleteFile(index)} />
                </p>
              </div>
            );
          })
        */}
        {/* <p onClick={this.onClearFiles}>{getDict('dropzone.clearAll')}</p> */}
      </div>
    );
  }
}

export default DropzoneWrapper;
