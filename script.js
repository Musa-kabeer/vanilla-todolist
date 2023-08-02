'use script';
const form = document.querySelector('form');
const inputValue = document.querySelector('.input');
const domLists = document.querySelector('ul');

// Get items from local storage if there is item,else use empty array
const lists = JSON.parse(localStorage.getItem('vanillaTodo')) || [];

// Update dom on first rendering
updateDOMList();

// SUBMIT FORM
form.addEventListener('submit', formHandler, true);

function formHandler(e) {
  e.preventDefault();

  if (!inputValue.value) return;

  if (lists.find((el) => el.content === inputValue.value)) {
    return alert(`"${inputValue.value}" already exist!`);
  }

  const charSplit = inputValue.value.split('');
  const firstChar = charSplit[0].toUpperCase();
  const otherChar = charSplit.slice(1);
  const content = firstChar + otherChar.join('');

  const date = new Date();
  const createdAt = `${date.getDate()} - ${date.getMonth()} - ${date.getFullYear()} : ${date.getHours()}:${date.getMinutes()}`;

  lists.push({
    id: lists.length + 1,
    content,
    completed: false,
    createdAt,
    color: '',
  });

  updateDOMList();

  localStorage.setItem('vanillaTodo', JSON.stringify(lists));
}

function updateDOMList() {
  // Clean the DOM first before adding new values or else duplicate values will be preceed
  domLists.innerHTML = '';

  // Rendering Lists on the DOM
  lists.forEach((list) => {
    const html = `
     <li>
        <div class="grid">
          <div class="content ${
            list.completed ? 'line' : ''
          }" style="color: ${list.color}">${list.content}</div>
          <div class="date">${list.createdAt}</div>
          <div id=${
            list.id
          }  class="completed"><i class="fa-solid fa-pen-to-square fa-xs"></i></div>
          <div id=${
            list.id
          }  class="edit"><i class="fa-solid fa-pen-to-square fa-xs"></i></div>
          <div id=${
            list.id
          }  class="delete"><i class="fa-solid fa-delete-left fa-2xs"></i></div>
        </div>
     </li>
    `;

    domLists.insertAdjacentHTML('beforeend', html);
  });

  inputValue.value = '';
}

// ON TASK HANDLERS
document.addEventListener('click', handleTask, true);

function handleTask(e) {
  if (e.target.className === 'completed') completeElement(e);

  if (e.target.className === 'edit') editElement(e);

  if (e.target.className === 'delete') deleteElement(e);
}

// COMPLETE TASK
function completeElement(e) {
  let item = lists.find((el) => el.id === Number(e.target.id));

  item.completed = !item.completed;

  const randomNum = Math.floor(Math.random() * 3 + 1);

  const colors = ['', '#41ff41b9', '#d24605e7', '#069ebde7'];

  item.color = colors[randomNum];

  localStorage.setItem('vanillaTodo', JSON.stringify(lists));

  const element = e.target.closest('.grid').firstElementChild;
  if (item.completed === false) {
    element.classList.remove('line');
    element.style.color = '';
  }

  if (item.completed === true) {
    element.classList.add('line');
    element.style.color = colors[randomNum];
  }
}

// EDIT TASK
function editElement(e) {
  console.log(lists);

  if (e.target.parentElement.parentElement.children.length === 2) {
    return e.target.parentElement.parentElement.lastElementChild.classList.toggle(
      'hidden'
    );
  }

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

      localStorage.setItem('vanillaTodo', JSON.stringify(lists));

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

  localStorage.setItem('vanillaTodo', JSON.stringify(lists));
}
