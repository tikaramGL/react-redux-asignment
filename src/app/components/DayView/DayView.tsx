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
    currentDate: any
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
                </React.Fragment>
            )
        })
    }

    toggleEvent = () => {
        
    }

    dispalyEvent = () => {
        const allEvent = this.props.headerData;
        return allEvent.map((event: any, index) => {
            const eventDate = event['startTime'].substring(4, 15);
            const currentFDate = moment(this.props.currentDate).format("MMM DD YYYY");
            if (eventDate === currentFDate) {
                const eventTime = event['startTime'].substring(16, 24);
                let startTime = moment(event['startTime'].substring(16, 24), "HH:mm:ss");
                let endTime = moment(event['endTime'].substring(16, 24), "HH:mm:ss");
                let diffInHrs = endTime.diff(startTime, 'hours');
                //outer div to display event
                let d = document.createElement('div');
                d.innerHTML = event['title']+' | '+moment(event['startTime']).format("hh:mm A")+' | '+moment(event['endTime']).format("hh:mm A");
                d.setAttribute('class', 'eventDiv');
                d.style.backgroundColor = '#f8d7da';
                d.style.border = '1px solid #f5c6cb';
                d.style.borderRadius = '4px';
                d.style.padding = '7px 10px';
                d.style.margin = '0px';
                d.style.display = 'block';
                d.style.position = 'absolute';
                d.style.marginLeft = '100px';
                let a = (event['startTime'].substring(16, 18)-9)*51+'px';
                let b = ((diffInHrs+1)*44)+'px';
                d.style.top = a.toString();
                d.style.height = b.toString();
                d.style.zIndex = (100-index).toString();
                d.addEventListener("click", this.toggleEvent);
                //delete button for event
                const deleteLink = document.createElement('button')
                deleteLink.setAttribute('data-val', event['id'])
                deleteLink.addEventListener("click", this.props.deleteEvent);
                deleteLink.innerHTML = 'x';
                //edit button for event
                const editLink = document.createElement('a');
                editLink.setAttribute('href', "#/edit-event/" + event['id']);
                editLink.setAttribute('class', 'editEventBtn');
                editLink.innerHTML = 'Edit';
                if(document.querySelector('table') != null) {
                    document.querySelector('table').appendChild(d);
                }
                d.appendChild(deleteLink);
                d.appendChild(editLink);
            }
        })
    }

    clearAllEvent = () => {
        const elements = document.getElementsByClassName("eventDiv");
        while (elements.length > 0) elements[0].remove();
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
    return bindActionCreators({ addEvent: addEvent, deleteEvent: deleteEvent }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(DayView);