import React, { useEffect, useState } from 'react'
import { get } from 'aws-amplify/api';

const myChatAPI = "chatapi"
const chatPath = '/chat'; 


const ChatList = () => {
    const [chats, setChats] = useState([]);

    async function getChats() {
        try {
          const restOperation = get({ 
            apiName: myChatAPI,
            path: chatPath ,
            
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
        const fetchChats = async () => {
            try {
                const response = await getChats();
                console.log(response);
                setChats(response);
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };

        fetchChats();
    }, []);

    return (
        <div>
            <h1>Chats List</h1>
            <ul>
                {chats.map((chat) => (
                    <li> {chat.text} </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatList;
