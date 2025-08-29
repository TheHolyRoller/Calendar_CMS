'use client'

import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { databases } from '../appwrite';
import { Query } from 'appwrite';
import { usePathname, useRouter } from 'next/navigation';
import { use } from 'react';


// TO DO change this to use local environment variables. This could cause an error 
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const QUESTION_COLLECTION_ID = process.env.APPWRITE_COLLECTION_ID;


const eventContext = createContext(null);


export const EventProvider = ({children}) => {



    const [events, setEvents] = useState(); 

    const hasInitialized = useRef(false); 


    // TO DO 
    // Add in the functionality to set the different main values of each event like names and location URLS 
    
    useEffect(() => {


        // Define the fetch events function here 
        console.log('🔄 QuizContext: Initializing quiz data fetch');
        const fetchQuestions = async () => {
            try {
                
                if (!DATABASE_ID || !QUESTION_COLLECTION_ID) {
                    throw new Error('Missing required Appwrite configuration');
                }

                            
                const allEvents = [];
                const limit = 1000; 
                let offset = 0;
                let totalDocuments = 0;
                let total;

                console.log('this is the limit \n', limit); 
                console.log('this is the offset \n', offset); 


                console.log('📥 QuizContext: Fetching questions from Appwrite');
                console.log('🔗 :', {
                    databaseId: DATABASE_ID,
                    collectionId: QUESTION_COLLECTION_ID
                });

                do {
                    const response = await databases.listDocuments(
                      DATABASE_ID,
                      QUESTION_COLLECTION_ID,
                      [
                        Query.limit(1000),
                        Query.offset(offset), 
                        
                      ]
                    );
                    
                    if (response.documents.length === 0) break;
                  
                    allEvents.push(...response.documents);
                    console.log('this is the length of all QUESTIONS \n', allEvents.length); 
                  
                    total = response.total;
                    offset += response.documents.length;
                  
                  } while (offset < total);

                  console.log(`✅ Total questions fetched: ${allEvents.length}`);

                if (!hasInitialized.current ) {

                    hasInitialized.current = true;
                    // setEvents(allEvents);
                    setEvents(allEvents)

                    // Change these to values that would be in an event 
                    // const gifURLS = allEvents.map(doc => doc.gif_url);
                    // setgif_urlS(gifURLS);
                    // setQuizLength(allEvents.length);
                    // setCurrentQuestion(allEvents[0]);
                    console.log('✅ Loaded all events:', allEvents.length);
                    console.log('these are all the events::::::::: \n', allEvents); 
     
                }

            } catch (error) {
                console.error('❌ QuizContext: Error fetching questions:', error);
                // setError(error.message);
                // Log the full error for debugging
                console.error('Full error details:', {
                    name: error.name,
                    message: error.message,
                    stack: error.stack
                });
            } finally {

                console.log('finally:::::')

            }
        };

        fetchQuestions();


    }, []); 











    return( 


        <eventContext.Provider value={{
            events 
          
        }}>

            {children}
        </eventContext.Provider>



    )












}



export const useEvent = () => {
    const context = useContext(eventContext);
    if (!context) {
        console.error('❌ QuizContext: useEvent must be used within EventProvider');
        throw new Error("useEvent must be used within EventProvider");
    }
    return context;
};
