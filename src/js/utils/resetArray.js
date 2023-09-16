export default function resetArray(arr) {
  while (arr.children.length > 2) {
    arr.lastChild.remove();
  }
}
