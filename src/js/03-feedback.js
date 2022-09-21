import throttle from 'lodash.throttle';


const STORAGE_KEY = 'feedback-form-state';


const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('.feedback-form  textarea'),
    input: document.querySelector('.feedback-form input')
};


let formData = {};


populateTextarea();

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextareaInput, 500));

function onTextareaInput(e) {
     e.preventDefault();
    formData[e.target.name] = e.target.value;
    
localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    
}


function populateTextarea() {
    const savedDataMessage = localStorage.getItem(STORAGE_KEY);
    const parseDataMessage = JSON.parse(savedDataMessage);

    if (savedDataMessage) {
        (refs.textarea.value = parseDataMessage.message || "");
        (refs.input.value = parseDataMessage.email || "");
    
        
    }
}


function onFormSubmit(e) {
    e.preventDefault();
    
    console.log('Отправил форму');
     localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);

}
