import creatTaskstList from './creatTasksList';
import { filterBy } from './filter';
import showModal from './modal';
import Task from './Task';

export default class TasksTracker {
  constructor() {
    this.container = null;
    this.tasks = [];
    this.pinned = [];
    this.all = [];
    this.tag = 'div';
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
      throw new Error('GamePlay not bind to DOM');
    }
  }

  drawUi() {
    this.checkBinding();

    this.container.innerHTML = `
      <div class="tasks-wrapper">
        <div class="tasks-board">
          <div class="tasks-field">
            <form>
              <label class="tasks-title tasks-title_label" for="enter-text">TOP Tasks</label>
              <input class="tasks-field__input" data-id="enter-text" type="text" name="enter-text" placeholder="Enter your text here">
            </form>
        </div>

        <div class="tasks-pinned">
          <div class="tasks-title">Pinned:</div>
          <div class="no-tasks">No pinned tasks</div>
        </div>

        <div class="tasks-all">
          <div class="tasks-title">All Tasks:</div>
          <div class="no-tasks">No tasks found</div>
        </div>
      </div>
    </div>
    `;

    this.pinned = document.querySelector('.tasks-pinned');
    this.all = document.querySelector('.tasks-all');
    this.pinnedNoTask = this.pinned.querySelector('.no-tasks');
    this.allNoTask = this.all.querySelector('.no-tasks');
    this.container.addEventListener('click', (e) => this.onClick(e));
    this.addTask();
  }

  addTask() {
    const enterEl = document.querySelector("[data-id='enter-text']");

    enterEl.addEventListener('keypress', (e) => this.onKeypress(e));
    enterEl.addEventListener('input', () => this.onInput(enterEl));
  }

  onClick(e) {
    if (e.target.type === 'text') {
      const parentElementAll = e.target.closest('.tasks-all');
      if (parentElementAll) {
        this.redraw(e, 'yes', this.pinned, this.pinnedNoTask, true);
        return;
      }

      const parentElementPin = e.target.closest('.tasks-pinned');

      if (parentElementPin) {
        this.redraw(e, 'no', this.all);
      }
    }
  }

  onKeypress(e) {
    if (e.which === 13) {
      e.preventDefault();

      if (e.currentTarget.value !== '') {
        const task = new Task('no', e.currentTarget.value, Date.now());
        this.tasks.push(task);
        this.allNoTask.classList.add('inactive');
        this.showAllTasks('no');
        e.currentTarget.value = '';
      } else {
        showModal('Write text!', '✍');
      }
    }
  }

  onInput(element) {
    this.resetAllTasks(this.all);

    const filterArray = filterBy(this.sort(), element.value);
    if (filterArray.length === 0) {
      this.allNoTask.classList.remove('inactive');
    }
    filterArray.forEach((el) => creatTaskstList(el, this.all, this.tag));
  }

  showAllTasks(pin) {
    let array = this.all;
    let activeEl = this.pinnedNoTask;
    let inactiveEl = this.allNoTask;
    let isClass = false;
    if (pin === 'yes') {
      array = this.pinned;
      activeEl = this.allNoTask;
      inactiveEl = this.pinnedNoTask;
      isClass = true;
    }

    const tasksAfterFilter = this.sort(pin);
    if (tasksAfterFilter.length !== 0) {
      inactiveEl.classList.add('inactive');
    }

    if (tasksAfterFilter.length === this.tasks.length) {
      activeEl.classList.remove('inactive');
    }
    tasksAfterFilter.forEach((o) => creatTaskstList(o, array, this.tag, isClass));
  }

  redraw(e, pin, array) {
    const parentListEl = e.target.closest('.tasks-list');
    parentListEl.parentNode.removeChild(parentListEl);
    this.tasks.find((task) => task.id === +parentListEl.id).pin = pin;

    this.resetAllTasks(array);
    this.showAllTasks(pin);
  }

  sort(pin = 'no') {
    if (pin !== 'no') {
      return this.tasks.filter((task) => task.pin === 'yes');
    }
    return this.tasks.filter((task) => task.pin === 'no');
  }

/* eslint-disable */
  resetAllTasks(arr) {
    while (arr.children.length > 2) {
      arr.removeChild(arr.lastChild);
    }
  }
}
