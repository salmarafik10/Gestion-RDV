import ChatbotIcon from "./ChatbotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import { companyInfo } from "./companyinfo";

import './chatbot.css';

import { useRef, useState, useEffect } from "react";



const Chatbot = () => {

  const [chatHistory, setChatHistory] = useState([{
    id: 1,
    hideInChat: true,
    role: "model",
    text: companyInfo

  }]);
  const [showChatbot, setshowChatbot] = useState(false);
  const chatBodyRef=useRef();

  const generateBotResponse = async (history) => {

     //Helper function to update chat history

      const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => {
        // Remove "Thinking..." message and add the new response
        const filteredHistory = prev.filter((msg) => msg.text !== "Thinking...");
        return [...filteredHistory, { 
          id: Date.now(), // Add unique ID
          role: "model",
          text, 
          isError 
        }];
      });
      };

    // Format chat history for API request
    const formattedHistory = history.map(({role, text, image}) => {
      if (image) {
        // For messages with images, include both text and image
        return {
          role,
          parts: [
            { text },
            { 
              inline_data: {
                mime_type: "image/jpeg",
                data: image.split(',')[1] // Remove data:image/jpeg;base64, prefix
              }
            }
          ]
        };
      } else {
        return { role, parts: [{text}] };
      }
    });

const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({contents: formattedHistory})
}
try {
    // Make the API call to get the bot's response
    const response = await fetch(process.env.REACT_APP_API_URL, requestOptions);
    const data = await response.json();
    if(!response.ok) throw new Error(data.error.message || "Something went wrong!");

    // Clean and update chat history with bot's response

 const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
   updateHistory(apiResponseText);
    }catch (error) {
    updateHistory(error.message,true);
    }
};

useEffect(() => {
// Auto-scroll whenever chat history updates
chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
}, [chatHistory]);       

    return (
    <div className={`container ${showChatbot ? "show-chatbot" : "" }`}>
      <button onClick={()=> setshowChatbot(prev => !prev)} id="chatbot-toggler">
         <span className="material-symbols-rounded">mode_comment</span>
         <span className="material-symbols-rounded">close</span>
      </button>
    <div className="chatbot-popup">
      {/*chatbot header*/}
    <div className="chat-header">
    <div className="header-info">
    <ChatbotIcon/>
    <h2 className="logo-text">Chatbot</h2>
    </div>
    <button  onClick={()=> setshowChatbot(prev => !prev)} className="material-symbols-rounded" >
    keyboard_arrow_down
    </button>
    </div>
    
    {/* Chatbot Body */}
    <div ref={chatBodyRef} className="chat-body">
      <div className="message bot-message">
        <ChatbotIcon />
       <p className="message-text">
       Hey there 👋 <br /> How can I help you today?
       </p>
      </div>
      {/*rendre the chat history dynamically*/}
      {chatHistory.map((chat, index)=> (
        <ChatMessage key={chat.id} chat={chat}/>
      ))}
    </div>
    
    {/* Chatbot Footer */}
    <div className="chat-footer">
     <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse}/>
    </div>
    </div>
    </div>
    );
};
export default Chatbot;