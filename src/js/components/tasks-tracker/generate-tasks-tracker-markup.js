export default function generateTaskTrackerMarkup() {
  return `
      <div class="tasks-wrapper">
        <div class="tasks-board">
          <div class="task-form">
            <form>
              <label class="task-title task-title_label" for="enter-text">TOP Tasks</label>
              <input class="task-form__input" data-id="enter-text" type="text" name="enter-text" placeholder="Enter your text here">
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
}
