import * as React from 'react';
import './DayView.css';
import * as moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addEvent } from '../../actions/header';

interface Props {
    headerData: [],
    addEvent?: (currId: any) => void,
    currentDate : any
}

class DayView extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    diplayTimeLine = (time: Array<any>) => {
        return time.map((item, index) => {
            return (
                <React.Fragment key={index}>
                    <tr key={index}>
                        <td className="time">{item}</td>
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
                const eventTime = moment(event['startTime'], ["HH:mm:ss"]).format("hh A");
                console.log(event['startTime'])
                console.log(eventTime)
                let timeSt:any = document.querySelector('[data-time='+'"'+eventTime+'"'+']');
                timeSt.innerHTML = event['title'];
                timeSt.style.borderLeft = '3px solid #8c57d9';

                const editLink = document.createElement('a');
                editLink.setAttribute('href',"#/edit-event");
                editLink.setAttribute('class', 'editEventBtn');
                editLink.innerHTML = 'Edit';

                timeSt.appendChild(editLink);

                const deleteLink = document.createElement('a');
                deleteLink.setAttribute('href',"#/delete-event");
                deleteLink.setAttribute('class', 'deleteEventBtn');
                deleteLink.innerHTML = 'Delete';

                timeSt.appendChild(deleteLink);
                timeSt.appendChild(editLink);
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
        this.clearAllEvent();
        this.dispalyEvent();
        const time = ['09 AM', '10 AM', '11 AM', '12 PM', '01 PM', '02 PM', '03 PM', '04 PM', '05 PM', '06 PM', '07 PM', '08 PM', '09 PM', '10 PM', '11 PM', '12 AM', '01 AM', '02 AM', '03 AM', '04 AM', '05 AM', '06 AM', '07 AM', '08 AM'];
        return (
            <div className="view-container">
                <table id="eventTable">
                    <tbody>
                        {this.diplayTimeLine(time)}
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
    return bindActionCreators({ addEvent: addEvent }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(DayView);