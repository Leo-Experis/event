import { createContext, ReactNode, useState } from "react";
import EventProp from "../proptypes/EventProp";


interface EventContextType {
    events: EventProp[]
    createEvent: (event: EventProp) => void
    getEvents: () => EventProp[]

}

const EventContext = createContext<EventContextType>({
    events: [],
    createEvent: () => { },
    getEvents: () => [],

})


const EventProvider = ({ children }: { children: ReactNode }) => {
    const [events, _setEvents] = useState<EventProp[]>([])

    const createEvent = (event: EventProp) => {
        _setEvents([...events, event])
    }

    const getEvents = () => {
        return events
    }

    const value = {
        events,
        createEvent,
        getEvents
    }

    return (
        <EventContext.Provider value={value}>{children}</EventContext.Provider>
    )
}


export { EventProvider, EventContext }