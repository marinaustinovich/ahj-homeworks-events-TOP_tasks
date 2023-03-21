export default function creatTasksList(data, containerEl, elementTag, isClass = false) {
  const el = document.createElement(elementTag);
  el.setAttribute('data-pin', data.pin);
  el.setAttribute('id', data.id);
  el.classList.add('tasks-list');
  let classInput = 'checkbox_input';
  if (isClass) {
    classInput = 'checkbox_input checkbox_input_checked';
  }
  el.innerHTML = `
    <label class="checkbox">
      <input type="text" class="${classInput}">
      <div class="checkbox__text" data-text=${data.text}>${data.text}</div>
    </label>
  `;
  containerEl.appendChild(el);
}
