import * as React from 'react';
import './EditEvent.css';
import { Link } from 'react-router-dom';
import {addEvent} from '../../actions/header';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import store from '../../App';

interface Props {
   addEvent ?: (event:any) => void,
   match: any
}

class EditEvent extends React.Component<Props> {
   constructor (props:Props) {
      super(props);
      this.state = {};
   }  

   componentDidMount() {
      this.getEventObj();
   }

   getEventObj = () => {
      alert("Here")
      const event = store.getState();
      console.log(event)
      return {event}
   }

    render() {
      const handleEvent = (event:any) => {
         console.log(event)
         //this.props.addEvent(event)
      }

      return (
         <div id="newEventForm">
            <Link to="/">
               <button id="backBtn">Back</button>
            </Link>
            <br />
            <h4>{this.props.match.params.id}</h4>
            <form onSubmit={() => handleEvent(event)}>
               <div>
                  <label>Event Title:</label>
                  <input id="title" name="title" />
               </div>
               <div>
                  <label>Start Time:</label>
                  <input id="startTime" name="startTime" type="datetime-local" />
               </div>
               <div>
                  <label>End Time:</label>
                  <input id="endTime" name="endTime" type="datetime-local" />
               </div>
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
   return bindActionCreators({ addEvent: addEvent }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(EditEvent);