export const addEvent = (event:any) => {
    return {
        type: "ADD_EVENT",
        payload: event
    }
}

export const editEvent = (event:any) => {
    return {
        type: "EDIT_EVENT",
        payload: event
    }
} 

export const deleteEvent = (event:any) => {
    return {
        type: "DELETE_EVENT",
        payload: event.target.attributes[0].value
    }
} 
