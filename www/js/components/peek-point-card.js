/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Card, CardActions, CardText, RaisedButton } from 'material-ui';
import PointHeader from './point-header';
/*eslint-enable no-unused-vars*/

const dayMap = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday',
  'Thursday', 'Friday', 'Saturday' ];

export class PeekPointCard extends Component {

  getDays( seasons ) {
    let seasonDays = seasons[ 0 ].days;
    const date = ( new Date() );
    const curMonth = date.getMonth();
    const curDate = date.getDate();
    seasons.forEach( season => {
      /*esfmt-ignore start*/
      if ( ( season.seasonStart )
          && ( season.seasonEnd )
          && ( season.seasonStart.month <= curMonth <= season.seasonEnd.month )
          && ( season.seasonStart.date <= curDate <= season.seasonEnd.date ) ) {
        seasonDays = season.days;
      }
    /*esfmt-ignore end*/
    } );
    return seasonDays;
  }

  render() {
    const {fullscreenMarker, deselectMarker, point, history} = this.props;

    const smallHeight = point.coverUrl ? 300 : 224;
    const smallHeightCSS = `${smallHeight}px`;
    let cardStyle = {
      width: '100%',
      position: 'fixed',
      bottom: '0px',
      height: smallHeightCSS,
      transition: 'all 300ms ease',
      zIndex: '8',
      overflowY: 'auto'
    };

    let seeButton = (
    <RaisedButton secondary
      onClick={ ( ) => fullscreenMarker() }
      label="See More" />
    );

    // this logic is for points with hour / schedule information
    // TODO: consider revising logic placement
    let timeDetails = '';
    if ( point.schedule && point.schedule.length > 0 ) {
      let day = this.getDays( point.schedule ).filter( dayEle => {
        return dayMap.indexOf( dayEle.day ) == ( new Date() ).getDay();
      } )[ 0 ]; // get the day that matches today.

      // when is the service open
      const text = day ? `Open until ${day.closes}` : 'Not Open Today';
      timeDetails = <span className='open-until'>
                      { text }
                    </span>;
    }

    // small screen details
    const cardDetails = (
    <CardText>
      { point.description }
      { timeDetails }
    </CardText>
    );

    return (
      <Card id="mdl-map-card"
        className="form-column"
        style={ cardStyle }>
        <PointHeader point={ this.props.point } history={ history } />
        <div style={ { margin: '8px', marginBottom: '64px' } }>
          { cardDetails }
        </div>
        <CardActions className="form-row view-buttons">
          { seeButton }
          <RaisedButton onClick={ ( ) => deselectMarker() } label="Close" />
        </CardActions>
      </Card>
      );
  }
}

export default PeekPointCard;