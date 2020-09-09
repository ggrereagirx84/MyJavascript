'use strict'

{
  const tbody = document.querySelector('tbody');
  const button = document.getElementById('add');
  const tasks = [];

  function addList(tasks) {
    for (let task of tasks) {
      const tr = document.createElement('tr');
      createContent(tr, tasks.indexOf(task))
      createContent(tr, task.content);
      createStatus(tr, task.status);
      createStatus(tr, '削除');
      tbody.appendChild(tr);
    }
  }

  function createContent(tr, text) {
    const td = document.createElement('td');
    td.textContent = text;
    tr.appendChild(td);
  }

  function createStatus(tr, text) {
    const input = document.createElement('input');
    input.type = 'button';
    input.value = text;
    const td = document.createElement('td');
    td.appendChild(input);
    tr.appendChild(td);
  }

  button.addEventListener('click',() => {
    if (document.getElementById('form').value !== '') {
      while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
      }
      const newContent = document.getElementById('form').value;
      const newStatus = '作業中';
      tasks.push({content: newContent, status: newStatus});
      addList(tasks);
      document.getElementById('form').value = '';
    }
  });
}