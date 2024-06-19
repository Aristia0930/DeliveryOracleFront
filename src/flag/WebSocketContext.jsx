// WebSocketContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { AdminFlagContext } from "./Flag";
const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const { user } = useContext(AdminFlagContext);

    useEffect(() => {
        if (user) {
            const socket = new SockJS(`http://localhost:8080/ws?token=Bearer ${user}`);
            const client = Stomp.over(socket);

            client.connect({ Authorization: `Bearer ${user}` }, () => {
                client.subscribe('/user/topic/sendMessage', (msg) => {
                    const newMessage = JSON.parse(msg.body);
                    console.log(newMessage)
                    setMessages(newMessage);
                });
                setStompClient(client);
            });

            return () => {
                if (client) {
                    client.disconnect(() => {
                        console.log('Disconnected');
                    });
                }
            };
        }
    }, [user]);

    const sendMessage = (message) => {
        if (stompClient) {
            stompClient.send('/app/sendMessage', {}, JSON.stringify(message));
        }
    };

    return (
        <WebSocketContext.Provider value={{ stompClient, messages, sendMessage,setMessages }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};
