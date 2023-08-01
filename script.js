'use script';
const form = document.querySelector('form');
const inputValue = document.querySelector('.input');
const domLists = document.querySelector('ul');

let lists = [];

// SUBMIT FORM
form.addEventListener('submit', formHandler, true);

function formHandler(e) {
  e.preventDefault();

  if (!inputValue.value) return;

  if (lists.find((el) => el.content === inputValue.value)) {
    return alert(`"${inputValue.value}" already exist!`);
  }

  lists.push({
    id: lists.length + 1,
    content: inputValue.value,
    completed: false,
  });

  updateDOM();
}

function updateDOM() {
  // Clean the DOM first before adding new values or else duplicate values will be preceed
  domLists.innerHTML = '';

  // Rendering Lists on the DOM
  lists.forEach((list, i, arr) => {
    const html = `
    <li>
      <div class="content">${list.content}</div>
      <div id=${list.id} class="completed">2</div>
      <div id=${list.id}  class="edit">2</div>
      <div id=${list.id}  class="delete">2</div>
    </li>
    `;

    domLists.insertAdjacentHTML('beforeend', html);
  });

  inputValue.value = '';
}

// ON TASK COMPLETION
document.addEventListener('click', handleCompleteTask, false);

function handleCompleteTask(e) {
  if (e.target.className === 'completed') completeElement(e);

  if (e.target.className === 'edit') editElement(e);

  if (e.target.className === 'delete') deleteElement(e);
}

function completeElement(e) {
  let item = lists.find((el) => el.id === Number(e.target.id));

  item.completed = true;
}

function editElement(e) {
  let item = lists.find((el) => el.id === Number(e.target.id));

  item.completed = true;
}

function deleteElement(e) {
  // DELETE LIST FROM UI LISTS
  e.target.closest('li').className = 'hidden';

  // DELETE LIST FROM OUR LISTS ARRAY
  const index = lists.findIndex(
    (el) => el.id === Number(e.target.id)
  );

  lists.splice(index, 1);

  console.log(lists);
}
