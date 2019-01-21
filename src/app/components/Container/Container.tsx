import * as React from 'react';
import './Container.css';
import Header from '../Header/Header';
import DayView from '../DayView/DayView';
import * as moment from 'moment';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addEvent } from '../../actions/header';

interface Props {
   addEvent?: (currId: any) => void
}

interface State {
   currentDate: any
}

class Container extends React.Component<Props, State> {
   constructor(props:Props) {
      super(props);

      this.state = {
         currentDate: moment().format("DD MMM YYYY")
      }
   }

   prevDay = () => {
      const curDate = this.state.currentDate; 
      var previousDay = moment(curDate).subtract(1, 'day').format("DD MMM YYYY")
      this.setState({
         currentDate:previousDay
      })
   }

   nextDay = () => {
      const curDate = this.state.currentDate; 
      var nextDay = moment(curDate).add(1, 'day').format("DD MMM YYYY")
      this.setState({
         currentDate:nextDay
      })
   }

   setToday = () => {
      const today = moment().format("DD MMM YYYY");
      this.setState({
         currentDate:today
      })
   }

   render() {
      return (
         <div id="container">
            <Header currentDate={this.state.currentDate} prevDay={() => this.prevDay()} nextDay={() => this.nextDay()} setToday={() => this.setToday()}/>
            <br />
            <DayView currentDate={this.state.currentDate} />
         </div>
      )
   }
}

const mapStateToProps = (state: any) => {
   return {}
}

const matchDispatchToProps = (dispatch: any) => {
   return bindActionCreators({ addEvent: addEvent }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Container);