'use client'
import React, { useTransition } from 'react'
import { useState, useEffect } from 'react'

import { databases } from '../lib/appwrite';
import { ID } from 'appwrite'; 


import f from '../Styles/form.module.css'; 

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const QUESTION_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;


function Form() {

    const [event_name, setEventName] = useState(''); 
    const [location_url, setLocationURL] = useState(''); 


    useEffect(() => {


        console.log('this is the new event name \n', event_name); 
        console.log('this is the new event location url \n', location_url); 



    }, [event_name, location_url])


    const handleSubmit = async (e) => {

        // add in the appwrite code to create a new document here 
        e.preventDefault(); 

        try{


            const result = await databases.createDocument(

                // Add in the credentials here 
                DATABASE_ID, 
                QUESTION_COLLECTION_ID, 
                ID.unique(), 
                {
                    event_name, 
                    location_url

                }




            )




            setTimeout(() => {
                console.log('this is just a timeout'); 
              }, 200);


              alert('document created successfully! \n', result); 
              console.log('this is the response from the database in the document creation operation \n', result); 
              setLocationURL(""); 
              setEventName(""); 



        }
        catch(error){

            console.error('Error Creating Document', error); 



        }



    }

    // Add in the handle change function that updates the use State variables with the user input in real time 

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

    {/* <label>Event Name</label> */}
    <input placeholder='Event Name' required onChange={handleChange} />

    <input placeholder="Location URL" required onChange={handleURLChange}  />


    </form>

    <button form='eventForm' type='submit'  >

    Create Event 
    </button>

    </article>
    </section>
    
  )
}

export default Form