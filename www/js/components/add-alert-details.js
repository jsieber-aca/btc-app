/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';

import { RaisedButton, TextField } from 'material-ui';
import DropDown from './drop-down';
/*eslint-disable no-unused-vars*/

import { alertTypes, displayAlertType } from '../types';

export class AddAlertDetails extends Component {

  componentDidMount() {
    const {setDrawer} = this.props;
    setDrawer( 'Enter Information' ) ;
  }

  onNameUpdate( event ) {
    const {setPointName} = this.props;
    const name = event.target.value;
    setPointName( name );
  }

  onTypeSelect( type ) {
    const {setPointType} = this.props;
    setPointType( type );
  }

  onDescriptionUpdate( event ) {
    const {setPointDescription} = this.props;
    const description = event.target.value;
    setPointDescription( description );
  }

  onPhotoAdd() {
    const {setPointImage} = this.props;
    // This logic will not work on the browser
    // because of issue - Apache Cordova / CB-9852
    // https://issues.apache.org/jira/browse/CB-9852
    navigator.camera.getPicture(
      imageSrc => {
        setPointImage( imageSrc );
      },
      err => console.error( err ),
      { sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: navigator.camera.DestinationType.FILE_URI,
        encodingType: navigator.camera.EncodingType.PNG
      }
    );
  }

  render() {
    let latLngString = '';
    if ( this.props.newPoint.location.length !== 0 ) {
      const [lat, lng] = this.props.newPoint.location;
      latLngString = `(${lat.toFixed( 4 )}, ${lng.toFixed( 4 )})`;
    }

    let imgView = (<div />);
    if ( imageSrc !== '' ) {
      imgView = (<div>
                   <img src={ imageSrc } width="100%" />
                 </div>);
    }

    const {description, imageSrc} = this.props.newPoint;

    return (
      <div className="form-column">
        <div className="form-row">
          <TextField hintText="Name"
            onBlur={ this.onNameUpdate.bind( this ) }
            defaultValue={ this.props.newPoint.name } />
        </div>
        <div className="form-row">
          <TextField floatingLabelText="Location"
            disabled={ true }
            value={ latLngString } />
        </div>
        <DropDown className="form-row"
          text="Select Type"
          value={ this.props.newPoint.type }
          options={ alertTypes }
          textTransform={ displayAlertType }
          onSelectFunction={ this.onTypeSelect.bind( this ) } />
        <div className="form-row">
          <TextField fullWidth={ true }
            floatingLabelText="Description"
            multiLine={ true }
            rows={ 2 }
            rowsMax={ 4 }
            onBlur={ this.onDescriptionUpdate.bind( this ) }
            defaultValue={ description } />
        </div>
        <div className="form-row">
          { imgView }
        </div>
        <div className="form-row">
          <RaisedButton secondary
            onClick={ this.onPhotoAdd.bind( this ) }
            label="Upload Photo" />
        </div>
      </div>
      );
  }
}

export default AddAlertDetails;