import React, { useEffect, useState } from 'react'
import { get } from 'aws-amplify/api';

const myPromptAPI = "promptsapi"
const promptPath = '/prompt'; 


const PromptList = () => {
    const [prompts, setPrompts] = useState([]);

    async function getPrompts() {
        try {
          const restOperation = get({ 
            apiName: myPromptAPI,
            path: promptPath ,
            
          });
          const {body} = await restOperation.response;
          const json = await body.json();
          console.log('GET call succeeded: ', json);
          return json
        } catch (error) {
          console.log('GET call failed: ', error);
        }
      }

    useEffect(() => {
        const fetchPrompts = async () => {
            try {
                const response = await getPrompts();
                console.log(response);
                setPrompts(response);
            } catch (error) {
                console.error('Error fetching prompts:', error);
            }
        };

        fetchPrompts();
    }, []);

    return (
        <div>
            <h1>Prompt List</h1>
            <ul>
                {prompts.map((prompt) => (
                    <li> {prompt.name} </li>
                ))}
            </ul>
        </div>
    );
};

export default PromptList;
