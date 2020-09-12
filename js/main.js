'use strict'

{
  const tbody = document.querySelector('tbody');
  const button = document.getElementById('add');
  const tasks = [];

  function addList(tasks) {
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
    for (let task of tasks) {
      const tr = document.createElement('tr');
      const id = tasks.indexOf(task);
      createContent(tr, id);
      createContent(tr, task.content);
      createStatus(tr, task.status, 'sta', id);
      createStatus(tr, '削除', 'del', id);
      tbody.appendChild(tr);
    }
  }

  function createContent(tr, text) {
    const td = document.createElement('td');
    td.textContent = text;
    tr.appendChild(td);
  }

  function createStatus(tr, text, cls, id) {
    const input = document.createElement('input');
    input.type = 'button';
    input.value = text;
    input.classList.add(cls);
    input.dataset.index = id;
    const td = document.createElement('td');
    td.appendChild(input);
    tr.appendChild(td);
  }

  button.addEventListener('click',() => {
    if (document.getElementById('form').value !== '') {
      const newContent = document.getElementById('form').value;
      const newStatus = '作業中';
      tasks.push({content: newContent, status: newStatus});
      addList(tasks);
      document.getElementById('form').value = '';
    }
  });

  window.addEventListener('click', e => {
    if (e.srcElement.classList.contains('del')) {
      const delIndex = e.srcElement.dataset.index;
      tasks.splice(delIndex, 1);
      addList(tasks);
    }
  });

}