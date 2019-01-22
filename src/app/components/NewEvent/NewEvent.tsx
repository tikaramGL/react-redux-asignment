import * as React from 'react';
import './NewEvent.css';
import { Link } from 'react-router-dom';
import {addEvent} from '../../actions/header';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

interface Props {
   addEvent ?: (event:any) => void 
   history : any
}

class NewEvent extends React.Component<Props> {
    render() {
      const handleEvent = (event:any) => {
         event.preventDefault();
         this.props.addEvent(event)
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
                  <input id="title" name="title" autoComplete="off" />
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

export default connect(mapStateToProps, matchDispatchToProps)(NewEvent);