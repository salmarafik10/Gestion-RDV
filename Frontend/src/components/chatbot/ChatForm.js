import { useRef, useState } from "react";

const ChatForm = ({chatHistory,setChatHistory,generateBotResponse}) => {

   const inputRef = useRef();
   const fileInputRef = useRef();
   const [selectedImage, setSelectedImage] = useState(null);
   const [inputValue, setInputValue] = useState(''); // État pour la valeur de l'input

   const handleImageSelect = (e) => {
       const file = e.target.files[0];
       if (file && file.type.startsWith('image/')) {
           setSelectedImage(file);
           // L'image n'est plus envoyée automatiquement
       }
   };

   const handleInputChange = (e) => {
       setInputValue(e.target.value);
   };

   const handleFormSubmit = async (e) => {
       e.preventDefault();
       const userMessage = inputValue.trim();

       // Empêcher l'envoi si ni message ni image n'est présent
       if (!userMessage && !selectedImage) {
           return;
       }

       let imageData = null;
       if (selectedImage) {
           // Lire l'image sélectionnée comme une URL de données (base64)
           imageData = await new Promise((resolve) => {
               const reader = new FileReader();
               reader.onload = (event) => resolve(event.target.result);
               reader.readAsDataURL(selectedImage);
           });
       }

       // Créer le nouvel objet message avec le texte et/ou l'image
       const newMessage = {
           id: Date.now(),
           role: "user",
           text: userMessage,
           image: imageData // Sera null si aucune image n'est sélectionnée
       };

       // Mettre à jour l'historique du chat avec le message de l'utilisateur
       setChatHistory(history => [...history, newMessage]);

       // Effacer le champ de saisie et l'image sélectionnée
       setInputValue("");
       setSelectedImage(null);
       fileInputRef.current.value = ''; // Effacer également l'input de fichier

       // Ajouter un message "Thinking..." pour la réponse du bot
       setTimeout(() => {
           setChatHistory((history) => [...history, {
               id: Date.now() + 1,
               role: "model",
               text: "Thinking..."
           }]);
           // Appeler la fonction pour générer la réponse du bot avec l'historique mis à jour
           generateBotResponse([...chatHistory, newMessage]);
       }, 600);
   };

   const clearSelectedImage = () => {
       setSelectedImage(null);
       if (fileInputRef.current) {
           fileInputRef.current.value = '';
       }
   };

   return (
       <div className="chat-form-container">
           {/* Image preview */}
           {selectedImage && (
               <div className="image-preview">
                   <img src={URL.createObjectURL(selectedImage)} alt="Preview" />
                   <button 
                       type="button" 
                       onClick={clearSelectedImage}
                       className="remove-image-btn"
                   >
                       ×
                   </button>
               </div>
           )}
           
           <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
                 {/* Image upload button */}
           <button 
               type="button" 
               onClick={() => fileInputRef.current.click()}
               className="image-upload-btn"
               title="Ajouter une image">
               +
           </button>
               <input 
                   ref={inputRef} 
                   type="text" 
                   placeholder="Message..." 
                   className="message-input" 
                   value={inputValue}
                   onChange={handleInputChange}
               />
               <button 
                   className={`material-symbols-rounded ${inputValue.trim() || selectedImage ? 'active' : ''}`}
                   type="submit"
               >
                   arrow_upward
               </button>
           </form>
           
           <input 
               ref={fileInputRef}
               type="file" 
               accept="image/*" 
               onChange={handleImageSelect}
               style={{ display: 'none' }}
           />
       </div>
   );
};

export default ChatForm;