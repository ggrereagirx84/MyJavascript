'use strict'

{
  const tbody = document.querySelector('tbody');
  const button = document.getElementById('add');
  const status = ['作業中', '削除'];

  function addList(tasks) {
    const tr = document.createElement('tr');
    for (let i in tasks) {
      const td = document.createElement('td');
      td.textContent = tasks[i];
      tr.appendChild(td);
    }

    for (let i in status) {
      const input = document.createElement('input');
      const td = document.createElement('td');
      input.type = 'button';
      input.value = status[i];
      td.appendChild(input);
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }

  button.addEventListener('click',() => {
    const taskName = document.getElementById('form').value;
    const taskId = tbody.childElementCount;
    const tasks = [taskId, taskName];
    addList(tasks);
    document.getElementById('form').value = '';
  });
}