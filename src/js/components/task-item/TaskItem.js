import './task-item.css';

export default class TaskItem {
  constructor(data, isClass = false) {
    this.data = data;
    this.isClass = isClass;
    this.element = this.createElement();
  }

  createElement() {
    const el = document.createElement('div');
    el.setAttribute('data-pin', this.data.pin);
    el.setAttribute('id', this.data.id);
    el.classList.add('task-item');

    let classInput = 'checkbox_input';
    if (this.isClass) {
      classInput = 'checkbox_input checkbox_input_checked';
    }

    el.innerHTML = `
      <label class="checkbox">
        <input type="text" class="${classInput}">
        <div class="checkbox__text" data-text=${this.data.text}>${this.data.text}</div>
      </label>
    `;

    return el;
  }
}
