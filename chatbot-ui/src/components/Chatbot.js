import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Welcome to TechRacine! How can I assist you today?' },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    if (!userInput.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: userInput },
    ]);
    setUserInput('');
    setIsTyping(true);

    // Simulate bot reply after a delay
    setTimeout(() => {
      let botResponse = `You said: "${userInput}"`;

      // Customize bot responses based on user input
      if (userInput.toLowerCase().includes('products')) {
        botResponse = "We develop ETL tools and custom integration products. Would you like to know more?";
      } else if (userInput.toLowerCase().includes('sales')) {
        botResponse = "You can contact our sales team at sales@techracine.com.";
      } else if (userInput.toLowerCase().includes('services')) {
        botResponse = "We offer a range of IT services, including custom software solutions and integrations.";
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: botResponse },
      ]);
      setIsTyping(false);
    }, 1500); // Simulate typing delay
  };

  const setQuickReply = (question) => {
    setUserInput(question);
    sendMessage(); // Automatically send the question as a message
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">AskRacine Chatbot</div>
      <div className="chat-body">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.sender}-message`}>
            {message.sender === 'bot' && <img src="/robo.jpg" alt="Bot" className="bot-icon" />}
            <span>{message.text}</span>
          </div>
        ))}
        {isTyping && <div className="typing-indicator">TechRacine is typing...</div>}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      {/* Quick reply buttons */}
      <div className="quick-replies">
        <button className="custom-question" onClick={() => setQuickReply('What kind of products do you develop?')}>
          What kind of products do you develop?
        </button>
        <button className="custom-question" onClick={() => setQuickReply('How can I contact sales?')}>
          How can I contact sales?
        </button>
        <button className="custom-question" onClick={() => setQuickReply('What services do you offer?')}>
          What services do you offer?
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
