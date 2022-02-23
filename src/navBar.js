import { inputProjectOptions } from "./taskLogic";

const navButton = document.getElementsByClassName('nav-button');
const addProjectButton = document.getElementById('add-project-button');
const projects = document.getElementById('projects');


const addEventListeners = (() => {
    const addClassActiveButton = () => {
            for (let i = 0; i < navButton.length; i++){
                navButton[i].addEventListener('click', () => {
            
            for (let j = 0; j < navButton.length; j++){
                navButton[j].classList.remove('active-button')
            };
                
                
                if (navButton[i]) navButton[i].classList.add('active-button');
            });
            }
        };
    
    const addProjectEventListener = () => {
        addProjectButton.addEventListener('click', () => {
            const SubmitProjectdiv = document.getElementById('submit-project-div');
            const inputProjectField = document.getElementById('input-project-field');
            const addProjectButtons = document.getElementById('add-project-buttons');
            const addProjectButtonAdd = document.getElementById('add-project-button-add');
            const addProjectButtonCancel = document.getElementById('add-project-button-cancel');
            
            addProjectButton.style.display = 'none';
            SubmitProjectdiv.style.display = 'unset';

            addProjectButtonCancel.addEventListener('click', () => {
                    addProjectButton.style.display = 'unset';
                    SubmitProjectdiv.style.display = 'none';
                    inputProjectField.value = '';
                })
            addProjectButtonAdd.addEventListener('click', () => {
                if (inputProjectField.value != '') {
                addProjectButton.style.display = 'unset';
                SubmitProjectdiv.style.display = 'none';
                inputProjectField.value = '';
                inputProjectOptions()
                }    
            })

        })
    }
    
    return {
        addClassActiveButton,
        addProjectEventListener
    }
})();


export { addEventListeners};