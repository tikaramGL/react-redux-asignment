import * as React from 'react';
import './DayView.css';
import * as moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addEvent } from '../../actions/header';
import { deleteEvent } from '../../actions/header';

interface Props {
    headerData: [],
    addEvent?: (currId: any) => void,
    deleteEvent?: (eventId: any) => void,
    currentDate : any
}

class DayView extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    diplayTimeLine = (time: Array<any>) => {
        return time.map((item, index) => {
            
            const time = moment(item, ['HH:mm:ss']).format('hh:mm A');
            return (
                <React.Fragment key={index}>
                    <tr key={index}>
                        <td className="time">{time}</td>
                        <td className="time-data" data-time={item}></td>
                    </tr>
                    {/* <tr>
                        <td className="time">&nbsp;</td>
                        <td className="time-data" data-time={item.substr(0, 2) + ':30'}></td>
                    </tr> */}
                </React.Fragment>
            )
        })
    }


    dispalyEvent = () => {
        const allEvent = this.props.headerData;
        return allEvent.map((event:any, index) => {
            const eventDate = event['startTime'].substring(4, 15);
            const currentFDate = moment(this.props.currentDate).format("MMM DD YYYY");
            if(eventDate === currentFDate) {
                const eventTime = event['startTime'].substring(16, 24);
                                
                let timeSt:any = document.querySelector('[data-time='+'"'+eventTime+'"'+']');
                timeSt.innerHTML = event['title'];
                timeSt.style.borderLeft = '3px solid #8c57d9';

                const deleteLink = document.createElement('button')
                deleteLink.setAttribute('data-val',event['id'])
                deleteLink.addEventListener("click", this.props.deleteEvent);
                deleteLink.innerHTML = 'x';

                timeSt.appendChild(deleteLink);

                const editLink = document.createElement('a');
                editLink.setAttribute('href',"#/edit-event/"+event['id']);
                editLink.setAttribute('class', 'editEventBtn');
                editLink.innerHTML = 'Edit';

                timeSt.appendChild(editLink);

                // const deleteLink = document.createElement('a');
                // deleteLink.setAttribute('href',"#/delete-event");
                // deleteLink.setAttribute('class', 'deleteEventBtn');
                // deleteLink.innerHTML = 'Delete';
               
            }
        })
    }

    clearAllEvent = () => {
        let td:any = document.querySelectorAll("td.time-data")
        td.forEach(function(item:any) {
            item.innerHTML = '';
            item.style.borderLeft = '1px solid #ffeeba';
        })        
    }

    render() {
        const time = ['09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00', '16:00:00', '17:00:00', '18:00:00', '19:00:00', '20:00:00', '21:00:00', '22:00:00', '23:00:00', '00:00:00', '01:00:00', '02:00:00', '03:00:00', '04:00:00', '05:00:00', '06:00:00', '07:00:00', '08:00:00'];
        return (
            <div className="view-container">
                <table id="eventTable">
                    <tbody>
                        {this.diplayTimeLine(time)}
                        {this.clearAllEvent()}
                        {this.dispalyEvent()}
                    </tbody>
                </table>
            </div>
        )
        
        
    }
}

const mapStateToProps = (state: any) => {
    return {
        headerData: state.header.events
    }
}

const matchDispatchToProps = (dispatch: any) => {
    return bindActionCreators({ addEvent: addEvent, deleteEvent : deleteEvent}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(DayView);