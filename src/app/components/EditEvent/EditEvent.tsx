import * as React from 'react';
import './EditEvent.css';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import store from '../../App';
import { editEvent } from '../../actions/header';
import * as moment from 'moment';

interface Props {
   editEvent?: (event: any) => void,
   match: any,
   history: any
}

interface State {
   title: any,
   startTime: any,
   endTime: any,
   id: any
}

class EditEvent extends React.Component<Props, State> {
   constructor(props: Props) {
      super(props);
      this.state = {
         title: '',
         startTime: '',
         endTime: '',
         id: ''
      }
   }

   setEvenData = () => {
      let eventId = this.props.match.params.id;
      const storeObj: any = store.getState()
      let eventObj = storeObj.header.events[eventId - 1];
      this.setState({
         title: eventObj.title,
         startTime: eventObj.startTime,
         endTime: eventObj.endTime,
         id: eventObj.id,
      })
   }

   componentDidMount() {
      this.setEvenData();
   }

   handleTitleChange = (e: any) => {
      this.setState({ 'title': e.target.value });
   }

   handleStartTimeChange = (e: any) => {
      this.setState({ 'startTime': e.target.value });
   }

   handleEndTimeChange = (e: any) => {
      this.setState({ 'endTime': e.target.value });
   }

   render() {
      const handleEvent = (event: any) => {
         event.preventDefault();
         this.props.editEvent(event);
         this.props.history.push("/");
      }

      return (
         <div id="newEventForm">
            <Link to="/">
               <button id="backBtn">Back</button>
            </Link>
            <br />

            <form onSubmit={() => handleEvent(event)}>
               <div>
                  <label>Event Title:</label>
                  <input id="title" name="title" value={this.state.title} onChange={(e) => this.handleTitleChange(e)} />
               </div>
               <div>
                  <label>Start Time:</label>
                  <input id="startTime" name="startTime" type="datetime-local" value={moment(this.state.startTime).format('YYYY-MM-DDTHH:mm')} onChange={(e) => this.handleStartTimeChange(e)} />
               </div>
               <div>
                  <label>End Time:</label>
                  <input id="endTime" name="endTime" type="datetime-local" value={moment(this.state.endTime).format('YYYY-MM-DDTHH:mm')} onChange={(e) => this.handleEndTimeChange(e)} />
               </div>
               <input type="hidden" id="eventId" name="eventId" value={this.state.id}></input>
               <div>
                  <input className="submitBtn" type="submit" value="Submit"></input>
               </div>
            </form>
         </div>
      )
   }
}

const mapStateToProps = (state: any) => {
   return {}
}

const matchDispatchToProps = (dispatch: any) => {
   return bindActionCreators({ editEvent: editEvent }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(EditEvent);