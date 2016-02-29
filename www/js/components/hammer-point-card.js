/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import Hammer from 'react-hammerjs';
import PointCard from './point-card';
/*eslint-enable no-unused-vars*/

export class HammerPointCard extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      heightOffset: 0,
      changeScreen: false
    };
  }

  handleSwipe( e ) {
    const {fullscreenMarker, peekMarker, deselectMarker} = this.props;
    const pointDetails = document.getElementById( 'point-details' );
    /* if we are at the top of the card, pulling down should shrink the card */
    if ( this.props.show == 'full' ) {
      // in full screen

      // because hammer onPanStart doesn't work,
      // just check if that time of the action was within 0.15s
      if ( ( pointDetails.scrollTop == 0 ) && ( e.isFirst || e.deltaTime < 15 ) ) {
        // you can change the screen state since you're at the top
        this.setState( { changeScreen: true } );
      }
      if ( ( pointDetails.scrollTop == 0 ) && this.state.changeScreen ) {
        // at the top of the details
        this.setState( { heightOffset: e.deltaY } );
      }
      if ( !e.target.id == 'point-details' ) {
        // at the top of the details
        this.setState( { heightOffset: e.deltaY } );
        this.setState( { changeScreen: true } );
      }
    } else {
      // in peek screen
      this.setState( { changeScreen: true } );
      this.setState( { heightOffset: e.deltaY } );
    }

    /* Change the screen size (to full, peek, or hide) */
    if ( e.isFinal && this.state.changeScreen ) {
      this.setState( { heightOffset: 0, changeScreen: false } );
      if ( e.deltaY < -120 ) {
        fullscreenMarker();
      } else if ( e.deltaY > 120 ) {
        if ( this.props.show == 'full' ) {
          peekMarker();
        } else {
          deselectMarker();
        }
      }
    }
  }

  render() {
    const {history, fullscreenMarker, peekMarker, deselectMarker, setPointProps, setUpdate} = this.props;

    return (
      <Hammer>
        <PointCard point={ this.props.point }
          show={ this.props.show }
          heightOffset={ this.state.heightOffset }
          changeScreen={ this.state.changeScreen }
          deselectMarker={ deselectMarker }
          peekMarker={ peekMarker }
          fullscreenMarker={ fullscreenMarker }
          setPointProps={ setPointProps }
          setUpdate={ setUpdate }
          history={ history } />
      </Hammer>
      );
  }
}

export default HammerPointCard;
