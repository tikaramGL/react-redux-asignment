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
        "startTime": "Sun Jan 20 2019 20:00:00 GMT+0530 (IST)",
        "endTime": "Sun Jan 20 2019 21:00:00 GMT+0530 (IST)",
        "title": "Event 3",
        "id": 3
    }
]

let initialState = {
    events : dataArray
}

export const headerReducer = (state:any, action:any) => {
    switch(action.type) {
        case "ADD_EVENT":
        return state;

        default:
        return initialState;
    }
}