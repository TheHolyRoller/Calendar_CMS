'use client'
import React, { useTransition } from 'react'
import { useState, useEffect } from 'react'

import { useEvent } from '../lib/context/EventContext';
import f from '../Styles/form.module.css';

function Form() {
    const [event_name, setEventName] = useState(''); 
    const [location_url, setLocationURL] = useState(''); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { createEvent } = useEvent();

    useEffect(() => {
        console.log('this is the new event name \n', event_name); 
        console.log('this is the new event location url \n', location_url); 
    }, [event_name, location_url])

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setIsSubmitting(true);

        try {
            await createEvent({
                event_name,
                location_url
            });

            alert('Event created successfully!');
            setLocationURL("");
            setEventName("");
        } catch (error) {
            console.error('Error creating event:', error);
            alert('Error creating event: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleChange = (e) => {
        setEventName(e.target.value); 
        console.log('this is the latest name input \n', event_name); 
    }

    const handleURLChange = (e) => {
        setLocationURL(e.target.value); 
        console.log('this is the new event location URL in the handle change function \n', location_url); 
    }

    return (
        <section>
            <article>
                <form onSubmit={handleSubmit} id='eventForm' >
                    <input 
                        placeholder='Event Name' 
                        required 
                        onChange={handleChange}
                        value={event_name}
                        disabled={isSubmitting}
                    />
                    <input 
                        placeholder="Location URL" 
                        required 
                        onChange={handleURLChange}
                        value={location_url}
                        disabled={isSubmitting}
                    />
                </form>

                <button 
                    form='eventForm' 
                    type='submit'
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Creating Event...' : 'Create Event'}
                </button>
            </article>
        </section>
    )
}

export default Form