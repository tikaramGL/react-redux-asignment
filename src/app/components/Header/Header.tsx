import * as React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

interface Props {
   currentDate: any,
   prevDay: () => void,
   nextDay: () => void,
   setToday: () => void,
}

interface State {
   timeData: Array<any>,
}

class Header extends React.Component<Props, State> {

   constructor(props: Props) {
      super(props);

      this.state = {
         timeData: []
      }
   }

   render() {

      return (
         <header>
            <button className="cal_handlers" onClick={() => this.props.setToday()}>Today</button>
            <button onClick={() => this.props.prevDay()}><b>&lt;</b></button>
            <button onClick={() => this.props.nextDay()}><b>></b></button>
            <span id="date_display" className="cal_handlers">{this.props.currentDate}</span>
            <Link to="new-event">
               <button id="addEvent" className="cal_handlers">Add</button>
            </Link>
         </header>
      )
   }
}

export default Header;