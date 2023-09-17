
import "./index.scss"
import Loader from 'react-loaders';
import React, { useState, useEffect } from 'react';

const ChatComponent = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    setChatHistory([
      {
        role: 'bot',
        message: 'Welcome to the StudySmart Chat Bot!',
      },
      {
        role: 'bot',
        message: 'Ask anything that is on your mind.',
      }, 
    ]);
    const loadingTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
  
      return () => clearTimeout(loadingTimeout); 
    }, []);

  

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:200/bot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();

      setChatHistory([
        ...chatHistory,
        { role: 'user', message: userInput },
        { role: 'bot', message: data.message },
      ]);

      setUserInput('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="chat-container" style={{ display: isLoading ? 'none' : 'block' }}>
        <div className="chat-history">
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${message.role}`}
            >
              {message.message}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
            className="input-field"
          />
          <button onClick={handleSubmit} className="send-button">
            Send
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className="loader-container">
          <Loader type="pacman"/>
        </div>
      ) : null}
    </>
  );
};

export default ChatComponent;