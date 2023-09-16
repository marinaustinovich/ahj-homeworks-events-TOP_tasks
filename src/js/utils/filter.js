export function containsText(data, search) {
  const clean = search.trim().toLowerCase();
  return data.toLowerCase().includes(clean);
}

export function filterBy(tasks, search) {
  return tasks.filter((task) => containsText(task.text, search));
}
