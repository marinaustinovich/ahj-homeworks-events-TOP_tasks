import TaskItem from '../task-item/TaskItem';
import { filterBy } from '../../utils/filter';
import Task from '../task/Task';
import Modal from '../modal/Modal';
import generateTaskTrackerMarkup from './generate-tasks-tracker-markup';

import './tasks-tracker.css';
import resetArray from '../../utils/resetArray';

export default class TasksTracker {
  constructor() {
    this.container = null;
    this.tasks = [];
    this.pinnedTasksEl = [];
    this.allTasksEl = [];
    this.isModal = false;

    this.initModalListener();
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;

    this.drawUi();
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('Tracker not bind to DOM');
    }
  }

  drawUi() {
    this.checkBinding();
    this.render();

    this.pinnedTasksEl = this.container.querySelector('.tasks-pinned');
    this.allTasksEl = this.container.querySelector('.tasks-all');
    this.pinnedNoTaskEl = this.pinnedTasksEl.querySelector('.no-tasks');
    this.noAllTasksEl = this.allTasksEl.querySelector('.no-tasks');

    this.events();
  }

  render() {
    const itemHtml = generateTaskTrackerMarkup();
    this.container.insertAdjacentHTML('beforeend', itemHtml);
  }

  events() {
    const enterEl = document.querySelector("[data-id='enter-text']");
    const formEl = this.container.querySelector('form');

    formEl.addEventListener('submit', (e) => this.onSubmit(e));
    this.container.addEventListener('click', (e) => this.onClick(e));
    enterEl.addEventListener('input', () => this.onInput(enterEl));
  }

  initModalListener() {
    document.addEventListener('click', (e) => {
      if (
        e.target.dataset.handler === 'modalHandlerCancel'
        && this.currentModal
      ) {
        this.currentModal.hide();
        this.isModal = false;
      }
    });
  }

  createTask(value) {
    const task = new Task('no', value, Date.now());
    this.tasks.push(task);
    return task;
  }

  onClick(e) {
    if (e.target.type === 'text') {
      const parentElementAll = e.target.closest('.tasks-all');
      if (parentElementAll) {
        this.redraw(e, 'yes', this.pinnedTasksEl, this.pinnedNoTaskEl, true);
        return;
      }

      const parentElementPin = e.target.closest('.tasks-pinned');

      if (parentElementPin) {
        this.redraw(e, 'no', this.allTasksEl);
      }
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { value } = e.currentTarget.querySelector("[data-id='enter-text']");

    if (!value) {
      this.showModalMessage('Write text!', '✍');
      return;
    }

    this.createTask(value);
    this.noAllTasksEl.classList.add('inactive');
    this.showAllTasks('no');

    e.currentTarget.querySelector("[data-id='enter-text']").value = '';
  }

  onInput(element) {
    resetArray(this.allTasksEl);

    const filterArray = filterBy(this.sort(), element.value);
    if (filterArray.length === 0) {
      this.noAllTasksEl.classList.remove('inactive');
    } else {
      this.noAllTasksEl.classList.add('inactive');
    }
    filterArray.forEach((el) => {
      const taskItem = new TaskItem(el);
      this.allTasksEl.appendChild(taskItem.element);
    });
  }

  showAllTasks(pin) {
    const settings = {
      no: {
        array: this.allTasksEl,
        activeEl: this.pinnedNoTaskEl,
        inactiveEl: this.noAllTasksEl,
        isClass: false,
      },
      yes: {
        array: this.pinnedTasksEl,
        activeEl: this.noAllTasksEl,
        inactiveEl: this.pinnedNoTaskEl,
        isClass: true,
      },
    };

    const {
      array, activeEl, inactiveEl, isClass,
    } = settings[pin];

    const tasksAfterFilter = this.sort(pin);
    if (tasksAfterFilter.length !== 0) {
      inactiveEl.classList.add('inactive');
    }

    if (tasksAfterFilter.length === this.tasks.length) {
      activeEl.classList.remove('inactive');
    }

    tasksAfterFilter.forEach((taskData) => {
      const taskItem = new TaskItem(taskData, isClass);
      array.appendChild(taskItem.element);
    });
  }

  redraw(e, pin, array) {
    const parentListEl = e.target.closest('.task-item');

    const taskToUpdate = this.tasks.find(
      (task) => task.id === +parentListEl.id,
    );
    if (taskToUpdate) {
      taskToUpdate.pin = pin;
    }

    parentListEl.remove();

    resetArray(array);
    this.showAllTasks(pin);
  }

  sort(pin = 'no') {
    return this.tasks.filter((task) => task.pin === pin);
  }

  showModalMessage(message, unicode) {
    if (this.isModal) return;
    this.isModal = true;
    this.showModal(message, unicode);
  }

  showModal(message, unicode) {
    this.currentModal = new Modal({
      title: message,
      content: unicode,
      footerButtons: [
        {
          class: 'btn btn__cancel',
          text: 'Close',
          handler: 'modalHandlerCancel',
        },
      ],
    });
    this.currentModal.show();
  }
}
