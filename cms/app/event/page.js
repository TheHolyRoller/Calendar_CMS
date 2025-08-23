'use client'; 
import React from 'react'; 
// Import the event context here 
import { useEvent } from '../lib/context/EventContext';



function Event() {


    // Extract the events array value from the event context here 
    const { events } = useEvent(); 

    if(!events){

        return(<div>....Loading</div>); 

    }


  return (
    <div>

        {events.map(event => (
        <div key={event.$id} className="p-2 border-b">
          <h2>{event.event_name}</h2>
          <a href={event.location_url} target="_blank" rel="noopener noreferrer">
            {event.location_url}
          </a>
        </div>
      ))}


    </div>
  )
}

export default Event; 
