import * as moment from 'moment';

const dataArray = [
    {
        "startTime": "Wed Jan 16 2019 01:00:00 GMT+0530 (IST)",
        "endTime": "Wed Jan 16 2019 01:30:00 GMT+0530 (IST)",
        "title": "Event 1",
        "id": 1
    },
    {
        "startTime": "Thu Jan 17 2019 04:00:00 GMT+0530 (IST)",
        "endTime": "Thu Jan 17 2019 06:00:00 GMT+0530 (IST)",
        "title": "Event 2",
        "id": 2
    },
    {
        "startTime": "Sun Jan 20 2019 12:00:00 GMT+0530 (IST)",
        "endTime": "Sun Jan 20 2019 13:00:00 GMT+0530 (IST)",
        "title": "Event 3",
        "id": 3
    }
]

let initialState = {
    events: dataArray
}

const getTimezoneDifference = (time: any) => {
    return time + new Date().getTimezoneOffset() * 60 * 1000
}

export const headerReducer = (state: any, action: any) => {
    switch (action.type) {

        case "ADD_EVENT":
            let startDate = new Date(getTimezoneDifference(action.payload.target[1].valueAsNumber))
            let endDate = new Date(getTimezoneDifference(action.payload.target[2].valueAsNumber))
            let title = action.payload.target[0].value
            let eventObj = {
                startTime: startDate.toString(),
                endTime: endDate.toString(),
                title: title,
                id: state.events[state.events.length - 1].id + 1,
            }
            return { ...state, events: [...state.events, eventObj] };

        case 'EDIT_EVENT':
            let updateObj = {
                startDate: new Date(getTimezoneDifference(action.payload.target[1].valueAsNumber)).toString() || "",
                endDate: new Date(getTimezoneDifference(action.payload.target[2].valueAsNumber)).toString() || "",
                title: action.payload.target[0].value || "",
                id: action.payload.target[3].value || ""
            }
            let foundItem = state.events.find((ele: any) => ele.id == updateObj.id)
            foundItem.id = updateObj.id;
            foundItem.startTime = updateObj.startDate;
            foundItem.endTime = updateObj.endDate;
            foundItem.title = updateObj.title
            state.events = state.events.filter((ele: any) => ele.id != updateObj.id)
            let x = { ...state, events: [...state.events, foundItem] };
            return x;

        case "DELETE_EVENT":
            let filteredArray = state.events.filter((ele: any) => ele.id != parseInt(action.payload))
            return { ...state, events: filteredArray }

        default:
            return initialState;
    }
}