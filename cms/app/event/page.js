'use client'; 
import React from 'react'; 
// Import the event context here 
import { useEvent } from '../lib/context/EventContext';

function Event() {
    // Extract the events array value from the event context here 
    const { events, error, loading } = useEvent(); 

    if (loading) {
        return (
            <div className="p-4 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                <p>Loading events...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-red-500">
                <h2>Error loading events:</h2>
                <p>{error}</p>
            </div>
        );
    }

    if(!events || events.length === 0){
        return(
            <div className="p-4 text-center text-gray-500">
                No events found. Create your first event!
            </div>
        ); 
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
