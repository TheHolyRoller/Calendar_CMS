'use client'

import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const eventContext = createContext(null);

export const EventProvider = ({children}) => {
    const [events, setEvents] = useState(); 
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const hasInitialized = useRef(false); 

    useEffect(() => {
        console.log('🔄 EventContext: Initializing event data fetch');
        
        const fetchEvents = async () => {
            try {
                setLoading(true);
                setError(null);

                console.log('📥 EventContext: Fetching events from API');

                const response = await fetch('/api/events/list');
                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || 'Failed to fetch events');
                }

                console.log(`✅ Total events fetched: ${result.events.length}`);

                if (!hasInitialized.current) {
                    hasInitialized.current = true;
                    setEvents(result.events);
                    console.log('✅ Loaded all events:', result.events.length);
                    console.log('these are all the events::::::::: \n', result.events); 
                }

            } catch (error) {
                console.error('❌ EventContext: Error fetching events:', error);
                setError(error.message);
                console.error('Full error details:', {
                    name: error.name,
                    message: error.message,
                    stack: error.stack
                });
            } finally {
                setLoading(false);
                console.log('finally:::::')
            }
        };

        fetchEvents();
    }, []); 

    const createEvent = async (eventData) => {
        try {
            const response = await fetch('/api/events/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to create event');
            }

            // Refresh the events list after creating a new event
            const refreshResponse = await fetch('/api/events/list');
            const refreshResult = await refreshResponse.json();

            if (refreshResponse.ok) {
                setEvents(refreshResult.events);
            }

            return result;
        } catch (error) {
            console.error('Error creating event:', error);
            throw error;
        }
    };

    return( 
        <eventContext.Provider value={{
            events,
            error,
            loading,
            createEvent
        }}>
            {children}
        </eventContext.Provider>
    )
}

export const useEvent = () => {
    const context = useContext(eventContext);
    if (!context) {
        console.error('❌ EventContext: useEvent must be used within EventProvider');
        throw new Error("useEvent must be used within EventProvider");
    }
    return context;
};
