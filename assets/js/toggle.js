const chatbotToggler = document.getElementById("chatbot-toggler");
const chatbotFrame = document.getElementById("chatbotFrame");


// Funkcja tworząca "persistent store" 
function persistentStore(key, initialValue) {
  // Próba odczytania istniejących danych z sessionStorage
  let stored = sessionStorage.getItem(key);
  let value = stored ? JSON.parse(stored) : initialValue;

  // Funkcja aktualizująca wartość i zapisująca ją do sessionStorage
  function set(newValue) {
    value = newValue;
    sessionStorage.setItem(key, JSON.stringify(newValue));
    // Powiadomienie wszystkich subskrybentów o zmianie
  }

   // Funkcja pobierająca bieżącą wartość
  function get() {
    return value;
  }

  // Funkcja sprawdzająca, czy dany klucz istnieje w sessionStorage
  function exists() {
    return sessionStorage.getItem(key) !== null;
  }

  return { get, set, exists };
}

const isOpenWidget = persistentStore('isOpenWidget', false);

if (isOpenWidget.exists()) {
	let state = isOpenWidget.get();
	openWidget(state);
} 

       
if(chatbotFrame.style.display === "block") chatbotToggler.classList.add("show-chatbot");
        
chatbotToggler.addEventListener("click", () => {
	let state = (chatbotFrame.style.display === "none") ? true : false;
	openWidget(state)
	isOpenWidget.set(state);
});
 
window.addEventListener("message", (e) => {
  	if (e.data === "close_chatbot") {
		openWidget(false)
		isOpenWidget.set(false);
   }
});


function openWidget(state) {
	if (state) {
		chatbotToggler.classList.add("show-chatbot");
		chatbotFrame.style.display = "block";
	} else {
		chatbotToggler.classList.remove("show-chatbot");
		chatbotFrame.style.display = "none";
	}
} 