import { cycleStorageDOM, storageAvailable } from "./taskLogic";
import format from "date-fns/format";

const addTaskButton = document.getElementById('add-task-button');
const submitTaskDiv = document.getElementById('submit-task-div');
const inputName = document.getElementById('input-name');
const inputDate = document.getElementById('input-date');
const inputDescription = document.getElementById('input-description');
const displayTasks = document.getElementById('display-tasks');

const home = document.getElementById('home');
const today = document.getElementById('today');
const thisWeek = document.getElementById('this-week');
const archive = document.getElementById('archive');
const headline = document.getElementById('preview-headline');



let completedTasksStorage = [];

if (storageAvailable('localStorage')) {
    if (typeof (localStorage.completedTasks) === 'string') {
        completedTasksStorage = JSON.parse(localStorage.completedTasks)
      console.log(completedTasksStorage)
    };
}
const removeTasksDOM = () => {
    while (displayTasks.hasChildNodes()){
        displayTasks.removeChild(displayTasks.childNodes[0])
    }
    }

const addTask = () => {
    const addTaskButtonAdd = document.getElementById('add-task-button-add');
    const addTaskButtonCancel = document.getElementById('add-task-button-cancel');

    addTaskButton.addEventListener('click', () => {
        const submitTaskDiv = document.getElementById('submit-task-div');
        addTaskButton.style.display = 'none';
        submitTaskDiv.style.display = 'unset';
        
    });

    addTaskButtonCancel.addEventListener('click', () => {
        addTaskButton.style.display = 'unset';
        submitTaskDiv.style.display = 'none';
        inputName.value = '';
        inputDescription.value = '';
        inputDate.value = '';
    });
    
}   

const addTaskDOM = () => {
    const addTaskButton = document.getElementById('add-task-button');
    inputName.value = '';
    inputDescription.value = '';
    inputDate.value = '';
    submitTaskDiv.style.display = 'none';
    addTaskButton.style.display = 'unset';
};

const task = (name, date, priority, description, index, storage, project) => {
    const displayTasks = document.getElementById('display-tasks');
    const taskDiv = document.createElement('div');
    
    const taskName = document.createElement('div');
    const taskPriority = document.createElement('div');
    const taskDate = document.createElement('div');
    const taskDelete = document.createElement('img');
    const taskDescription = document.createElement('div');
    const taskProject = document.createElement('div');
    const taskEdit = document.createElement('img');
    const taskComplete = document.createElement('div');
    const taskDetails = document.createElement('div');
    
    taskDiv.setAttribute('id', index);
    taskDiv.setAttribute('class', 'task-div');
    taskDiv.addEventListener('click', () => {
        if (taskDetails.style.display == 'none') {
            taskDetails.style.display = 'flex';
        }
        else {
            taskDetails.style.display = 'none';
        }
    });
    taskDiv.addEventListener('mouseover', () => {
        taskDiv.style.backgroundColor = 'rgb(165 255 165)';
        taskDelete.style.transitionDuration = '1s';
        
    });
    taskDiv.addEventListener('mouseleave', () => {
        taskDiv.style.backgroundColor = 'white';
        taskDelete.style.transitionDuration = '1s';
        
    });
    
    
    taskComplete.setAttribute('id', 'task-complete');
    taskComplete.addEventListener('mouseover', () => {
        taskComplete.style.opacity = '1';
        taskComplete.style.transitionDuration = '0.2s';
        taskComplete.style.backgroundColor = '00ff0a';
    });
    taskComplete.addEventListener('mouseleave', () => {
        taskComplete.style.transitionDuration = '1s';
        taskComplete.style.opacity = '0.5';
        taskComplete.style.backgroundColor = 'white';
    });
    taskComplete.addEventListener('click', () => {
        taskComplete.parentNode.remove();
        completedTasksStorage.push(storage[index]);
        taskComplete.remove();
        storage.splice(index, 1);
        localStorage.setItem('completedTasks', JSON.stringify(completedTasksStorage));
        localStorage.setItem('tasks', JSON.stringify(storage));
        console.log(completedTasksStorage)
        removeTasksDOM();
        cycleStorageDOM();
    });




    
    taskName.setAttribute('id', 'task-name');
    taskName.innerHTML = name;
    
    taskPriority.setAttribute('id', 'task-priority');
    taskPriority.innerHTML = priority;
    
    
    taskDate.setAttribute('id', 'task-date');
    taskDate.innerHTML = format(new Date(date), "dd.MM.yyyy HH:mm ")
    
    taskDelete.setAttribute('id', 'task-delete');
    taskDelete.src = "https://upload.wikimedia.org/wikipedia/commons/4/4c/Grey_close_x.svg";
    
    taskDelete.addEventListener('mouseover', () => {
        taskDelete.style.opacity = '1';
        taskDelete.style.transitionDuration = '1s';
        taskDelete.style.transitionDuration = '0.2s';
        
    });
    taskDelete.addEventListener('mouseleave', () => {
        taskDelete.style.transitionDuration = '1s';
        taskDelete.style.opacity = '0.5';
    });
    taskDelete.addEventListener('click', () => {
        taskDelete.parentNode.remove();
        storage.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(storage));
        localStorage.setItem('completedTasks', JSON.stringify(completedTasksStorage));
        removeTasksDOM();
        cycleStorageDOM();
        console.log(storage);

    });
   
    
    
    taskDiv.appendChild(taskComplete);
    taskDiv.appendChild(taskName);
    taskDiv.appendChild(taskPriority);
    taskDiv.appendChild(taskDate);
    taskDiv.appendChild(taskDelete);
    
    // hidden task details 
    taskDiv.appendChild(taskDetails);
    
    taskDetails.setAttribute('id', 'task-details');
    
    
    

    
    
    taskProject.setAttribute('id', 'task-project');
    taskProject.innerHTML = project;
    
    
    taskEdit.setAttribute('id', 'task-edit');
    taskEdit.src = 'https://upload.wikimedia.org/wikipedia/commons/6/64/Edit_icon_%28the_Noun_Project_30184%29.svg';
    taskEdit.addEventListener('mouseover', () => {
        taskEdit.style.opacity = '1';
        taskEdit.style.transitionDuration = '0.2s';
        
    });
    taskEdit.addEventListener('mouseleave', () => {
        taskEdit.style.transitionDuration = '1s';
        taskEdit.style.opacity = '0.5';
    });
    taskEdit.addEventListener('click', () => {
        const editTaskForm = document.getElementById('edit-task-form');
        editTaskForm.style.display = 'unset';
        displayTasks.style.display = 'none';
        document.getElementById('edit-submit-form').setAttribute('class', index);


        const editInputName = document.getElementById('edit-input-name');
        const editInputeDescription = document.getElementById('edit-input-description');
        const editInputPriority = document.getElementById('edit-input-priority');
        const editInputDate = document.getElementById('edit-input-date');
        const editInputProject = document.getElementById('edit-input-project');

        editInputName.value = storage[index].name;
        editInputeDescription.value = storage[index].description;
        editInputPriority.value = storage[index].priority;
        editInputDate.value = storage[index].date;
        editInputProject.value = storage[index].project;
    });
    
    taskDescription.setAttribute('id', 'task-description');
    taskDescription.innerHTML = description;
    
    
    taskDetails.appendChild(taskProject);
    taskDetails.appendChild(taskEdit);
    taskDetails.appendChild(taskDescription);
    
    
    displayTasks.appendChild(taskDiv);
    

   



};

const homePage = () => {
    home.addEventListener('click', () => {
        addTaskButton.style.display = 'unset';
        home.classList.add('active-button');
        headline.innerHTML = 'Home';
        removeTasksDOM();
        cycleStorageDOM();
    })
} 
const todayPage = () => {
    today.addEventListener('click', () => {
        addTaskButton.style.display = 'unset';
        today.classList.add('active-button');
        headline.innerHTML = 'Today';
        removeTasksDOM();
        cycleStorageDOM();
    })
} 
const thisWeekPage = () => {
    thisWeek.addEventListener('click', () => {
        addTaskButton.style.display = 'unset';
        thisWeek.classList.add('active-button');
        headline.innerHTML = 'This week';
        removeTasksDOM();
        cycleStorageDOM();
    })
} 
const completedTasksDOM = () => { 
    for (let i = 0; i < completedTasksStorage.length; i++){
    task(
        completedTasksStorage[i].name,
        completedTasksStorage[i].date,
        completedTasksStorage[i].priority,
        completedTasksStorage[i].description,
        i,
        completedTasksStorage,
        completedTasksStorage[i].project

      );
}
}
const archivePage = () => {
    archive.addEventListener('click', () => {
        addTaskButton.style.display = 'none';
        archive.classList.add('active-button');
        headline.innerHTML = 'Archive';
        removeTasksDOM();
        completedTasksDOM();
        
    })
    return {
        completedTasksDOM
    }
} 

export { addTask, addTaskDOM, task, removeTasksDOM, homePage, todayPage, thisWeekPage, archivePage, completedTasksDOM }