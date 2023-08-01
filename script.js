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
  lists.forEach((list) => {
    const html = `
     <li>
        <div class="grid">
          <div class="content">${list.content}</div>
          <div id=${list.id}  class="completed">2</div>
          <div id=${list.id}  class="edit"><i class="edit fa-solid fa-pen-to-square fa-xs"></i></div>
          <div id=${list.id}  class="delete">2</div>
        </div>
     </li>
    `;

    domLists.insertAdjacentHTML('beforeend', html);
  });

  inputValue.value = '';
}

// ON TASK COMPLETION
document.addEventListener('click', handleTask, true);

function handleTask(e) {
  if (e.target.className === 'completed') completeElement(e);

  if (e.target.className === 'edit') editElement(e);

  if (e.target.className === 'delete') deleteElement(e);
}

// COMPLETE TASK
function completeElement(e) {
  e.target.closest('.grid').firstElementChild.style.textDecoration =
    'line-through';

  let item = lists.find((el) => el.id === Number(e.target.id));

  item.completed = !item.completed;

  document.querySelector('.completed').classList.add('hidden');
}

// EDIT TASK
function editElement(e) {
  const html = `
    <form class="editForm">
      <input type="text" class="input editInput" placeholder="Edit your list..." />
      <button>Edit</button>
    </form>
  `;

  let currentListContent =
    e.target.closest('.grid').firstElementChild;

  e.target.closest('li').insertAdjacentHTML('beforeend', html);

  // ON SUBMIT EDIT
  document
    .querySelector('.editForm')
    .addEventListener('submit', function (e) {
      e.preventDefault();
      const editValue = document.querySelector('.editInput');

      const list = lists.find(
        (list) => list.content === currentListContent.textContent
      );

      // UPDATE UI
      currentListContent.textContent = editValue.value;

      // UPDATE ARRAY
      list.content = editValue.value;

      editValue.value = '';
      document.querySelector('.editForm').classList.add('hidden');
    });
}

// DELETE TASK
function deleteElement(e) {
  // DELETE LIST FROM UI LISTS
  e.target.closest('li').className = 'hidden';

  // DELETE LIST FROM OUR LISTS ARRAY
  const index = lists.findIndex(
    (el) => el.id === Number(e.target.id)
  );

  lists.splice(index, 1);
}
