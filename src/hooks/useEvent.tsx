import { useContext } from "react"
import { EventContext } from "../context/event"


const useEvent = () => {
    return useContext(EventContext)
}

export default useEvent;