import ChatbotIcon from "./ChatbotIcon";

const ChatMessage = ({chat}) => {
    return (
        !chat.hideInChat && (
            <div className={`message ${chat.role === "model" ? "bot-message" : "user-message"}${chat.isError ? " error" : ""}`}>
                {chat.role === "model" && <ChatbotIcon />}
                <div className="message-content">
                    {chat.image && (
                        <div className="message-image">
                            <img src={chat.image} alt="Image envoyée" />
                        </div>
                    )}
                    <p className="message-text">{chat.text}</p>
                </div>
            </div>
        )
    );
};

export default ChatMessage;