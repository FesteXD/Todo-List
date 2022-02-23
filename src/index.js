import { addEventListeners } from "./navBar";
import {  addProjectsDOM, createProject, createTask,  cycleStorageDOM, editTask, inputProjectOptions, storageAvailable} from './taskLogic';
import {  addTask, archivePage, homePage, thisWeekPage, todayPage } from './default';


storageAvailable();
addTask();
editTask();
addProjectsDOM();
addEventListeners.addClassActiveButton()
addEventListeners.addProjectEventListener()
createTask();
createProject();

homePage();
todayPage();
thisWeekPage();
archivePage();

cycleStorageDOM();
inputProjectOptions()
















