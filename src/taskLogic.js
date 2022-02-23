import { format, isThisWeek, isToday, parseISO } from 'date-fns';
import { addTaskDOM, archivePage, completedTasksDOM, homePage, removeTasksDOM } from './default';
import { task } from './default';
import { addEventListeners } from './navBar';


const displayTasks = document.getElementById('display-tasks');
const headline = document.getElementById('preview-headline');
const displayProjects = document.getElementById('display-projects');
const addTaskButton = document.getElementById('add-task-button');

let projectStorage = [];
let taskStorage = [];


function storageAvailable(type) {
  var storage;
  try {
    storage = window[type];
    var x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch (e) {
    return e instanceof DOMException && (
      e.code === 22 ||
      e.code === 1014 ||
      e.name === 'QuotaExceededError' ||
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      (storage && storage.length !== 0);
  }
}

if (storageAvailable('localStorage')) {
  if (typeof (localStorage.project) === 'string') {
    projectStorage = JSON.parse(localStorage.project)
    console.log(projectStorage)
  };
  if (typeof (localStorage.tasks) === 'string') {
    taskStorage = JSON.parse(localStorage.tasks)
    console.log(taskStorage)
  };
}




const taskFactory = (name, description, priority, date, index, project) => {
  return {
    name,
    description,
    priority,
    date,
    index,
    project
  };
};

const inputProjectOptions = () => {
  const inputProject = document.getElementById('input-project');
  const editInputProject = document.getElementById('edit-input-project');
  while (inputProject.firstChild) {
    inputProject.removeChild(inputProject.firstChild);
    editInputProject.removeChild(editInputProject.firstChild);
  }
  for (let i = 0; i < projectStorage.length; i++) {
    const projectOption = document.createElement('option');
    projectOption.innerHTML = projectStorage[i];
    inputProject.appendChild(projectOption);
    const editProjectOption = document.createElement('option');
    editProjectOption.innerHTML = projectStorage[i];
    editInputProject.appendChild(editProjectOption);

  }

}
const removeProjectsDOM = () => {
  while (displayProjects.hasChildNodes()) {
    displayProjects.removeChild(displayProjects.childNodes[0])
  }
}



const addProjectsDOM = () => {
  removeProjectsDOM();
  for (let i = 0; i < projectStorage.length; i++) {
    const projectButton = document.createElement('div');
    projectButton.setAttribute('id', i);
    projectButton.setAttribute('class', 'nav-button');
    projectButton.innerHTML = projectStorage[i];
    projectButton.addEventListener('click', () => {
      addTaskButton.style.display = 'unset';
    })
    displayProjects.appendChild(projectButton);
    
    const projectDelete = document.createElement('img');
    

    projectDelete.setAttribute('id', 'project-delete');
    projectDelete.src = "https://upload.wikimedia.org/wikipedia/commons/4/4c/Grey_close_x.svg";
    
    projectDelete.addEventListener('mouseover', () => {
      projectDelete.style.opacity = '1';
      projectDelete.style.transitionDuration = '1s';
      projectDelete.style.transitionDuration = '0.2s';
        
    });
    projectDelete.addEventListener('mouseleave', () => {
      projectDelete.style.transitionDuration = '1s';
      projectDelete.style.opacity = '0.5';
    });
    projectDelete.addEventListener('click', () => {
      projectDelete.parentNode.remove();
      projectStorage.splice(i, 1);
      localStorage.setItem('projects', JSON.stringify(projectStorage));
      addProjectsDOM();
      homePage();

    });
    projectButton.appendChild(projectDelete)
   

    const addTasksOnDOMbyProject = () => {
      removeTasksDOM();
      for (let j = 0; j < taskStorage.length; j++) {
        if (projectButton.innerHTML === taskStorage[j].project) {
          task(
            taskStorage[j].name,
            taskStorage[j].date,
            taskStorage[j].priority,
            taskStorage[j].description,
            j,
            taskStorage,
            taskStorage[j].project
          )
        }
      }
    }




    projectButton.addEventListener('click', () => {
      if (projectStorage[i]) {
        headline.innerText = projectStorage[i];
        addTasksOnDOMbyProject()
      }
      else {
        homePage()
        document.getElementById('home').classList.add('active-button');
      }


    })

  }
  addEventListeners.addClassActiveButton()
}



const cycleStorageDOM = () => {
  if (headline.innerHTML === "Home") {
    removeTasksDOM();
    for (let i = 0; i < taskStorage.length; i++) {
      task(
        taskStorage[i].name,
        taskStorage[i].date,
        taskStorage[i].priority,
        taskStorage[i].description,
        i,
        taskStorage,
        taskStorage[i].project
      );
    }
  }
  if (headline.innerHTML === "Today") {
    removeTasksDOM();
    for (let i = 0; i < taskStorage.length; i++) {
      if (isToday(new Date(taskStorage[i].date))) {
        task(
          taskStorage[i].name,
          taskStorage[i].date,
          taskStorage[i].priority,
          taskStorage[i].description,
          i,
          taskStorage,
          taskStorage[i].project
        );
      }
    }
  }
  if (headline.innerHTML === "This week") {
    removeTasksDOM();
    for (let i = 0; i < taskStorage.length; i++) {
      if (isThisWeek(new Date(taskStorage[i].date), { weekStartsOn: 1 })) {
        task(
          taskStorage[i].name,
          taskStorage[i].date,
          taskStorage[i].priority,
          taskStorage[i].description,
          i,
          taskStorage,
          taskStorage[i].project


        );
      }
    }
  }
  if (headline.innerHTML === "Archive") {
    removeTasksDOM();
    completedTasksDOM();

  }


};
const findTaskIndex = () => {
  for (let i = 0; i < taskStorage.length; i++) {
    taskStorage[i].index = i;
  }
}



const createTask = () => {
  const inputName = document.getElementById('input-name');
  const inputPriority = document.getElementById('input-priority');
  const inputDescription = document.getElementById('input-description');
  const inputDate = document.getElementById('input-date');
  const inputProject = document.getElementById('input-project');


  const addTaskButtonAdd = document.getElementById('add-task-button-add');





  addTaskButtonAdd.addEventListener('click', () => {
    if (inputName.value != '' && inputDescription.value != '' && inputDate.value != '') {
      const task = taskFactory(inputName.value, inputDescription.value, inputPriority.value, inputDate.value, '', inputProject.value);
      addTaskDOM();
      taskStorage.push(task);
      cycleStorageDOM();
      findTaskIndex();
      addProjectsDOM();
      localStorage.setItem('tasks', JSON.stringify(taskStorage))
    }
    else {
      alert("Please, fill out the form!");
      cycleStorageDOM();
    }
  });

};

const editTask = () => {
  const editSubmitForm = document.getElementById('edit-submit-form');
  const editTaskForm = document.getElementById('edit-task-form');
  const editTaskButtonSubmit = document.getElementById('edit-task-button-submit');
  const editTaskButtonCancel = document.getElementById('edit-task-button-cancel');
  const editInputName = document.getElementById('edit-input-name');
  const editInputeDescription = document.getElementById('edit-input-description');
  const editInputPriority = document.getElementById('edit-input-priority');
  const editInputDate = document.getElementById('edit-input-date');
  const editInputProject = document.getElementById('edit-input-project');
  const taskIndex = editSubmitForm.classList.value;

  editTaskButtonCancel.addEventListener('click', () => {
    editTaskForm.style.display = 'none';
    displayTasks.style.display = 'unset';

  });

  editTaskButtonSubmit.addEventListener('click', () => {
    taskStorage[taskIndex].name = editInputName.value;
    taskStorage[taskIndex].description = editInputeDescription.value;
    taskStorage[taskIndex].priority = editInputPriority.value;
    taskStorage[taskIndex].date = editInputDate.value;
    taskStorage[taskIndex].project = editInputProject.value;
    cycleStorageDOM();
    findTaskIndex();
    editTaskForm.style.display = 'none';
    displayTasks.style.display = 'unset';
  });

}

const createProject = () => {
  const addProjectButtonAdd = document.getElementById("add-project-button-add");
  const inputProjectField = document.getElementById("input-project-field");

  addProjectButtonAdd.addEventListener("click", () => {
    if (inputProjectField.value != "") {
      projectStorage.push(inputProjectField.value);
      addProjectsDOM()
      localStorage.setItem('project', JSON.stringify(projectStorage))
    } else {
      alert("Please, insert the project name!");
    }
  });
};





export {
  createTask, cycleStorageDOM, createProject, inputProjectOptions, addProjectsDOM, editTask, storageAvailable
} 