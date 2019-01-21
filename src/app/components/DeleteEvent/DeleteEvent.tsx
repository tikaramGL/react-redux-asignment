import * as React from 'react';
import './DeleteEvent.css';
import { Link } from 'react-router-dom';

export class DeleteEvent extends React.Component {
   render() {
      return (
         <div id="newEventForm">
            <Link to="/">
               <button id="backBtn">Back</button>
            </Link>
            <br />
            <h1>Delete Event</h1>
         </div>
      )
   }
}