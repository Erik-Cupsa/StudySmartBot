
import "./index.scss"

import React, { useState } from 'react';

const ChatComponent = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSubmit = async () => {
    try {
      // Send a POST request to your Express.js API
      const response = await fetch('http://localhost:3001/chat', {
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

      // Add the user's input followed by the bot's response to the chat history
      setChatHistory([
        ...chatHistory,
        { role: 'user', message: userInput },
        { role: 'bot', message: data.message },
      ]);

      // Clear the user input field
      setUserInput('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="chat-container">
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
  );
};

export default ChatComponent;

