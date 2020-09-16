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

  function showTask() {
    const radio = document.getElementsByName('status');
    for (let i = 0; i < radio.length; i++) {
      if (radio[i].checked && radio[i].value === 'all') {
        const trs = document.querySelectorAll('tr');
        for (let tr of trs) {
          if (tr.classList === 'hidden') {
            tr.classList.remove('hedden');
          }
        }
      } else if(radio[i].checked && radio[i].value === 'working') {
        setHidden('完了','作業中');
      } else if(radio[i].checked && radio[i].value === 'done') {
        setHidden('作業中','完了');
      }
    }
  }

  function setHidden(add, remove) {
    const inputs = document.querySelectorAll('input');
    for (let input of inputs) {
      if (input.value === add && input.parentNode.parentNode.classList.contains('hidden') === false) {
        input.parentNode.parentNode.classList.add('hidden');
      } else if (input.value === remove && input.parentNode.parentNode.classList.contains('hidden') === true) {
        input.parentNode.parentNode.remove('hidden');
      }
    }
  }

  
  button.addEventListener('click',() => {
    if (document.getElementById('form').value !== '') {
      const newContent = document.getElementById('form').value;
      const newStatus = '作業中';
      tasks.push({content: newContent, status: newStatus});
      addList(tasks);
      document.getElementById('form').value = '';
      showTask();
    }
  });

  window.addEventListener('click', e => {
    if (e.target.classList.contains('del')) {
      const delIndex = e.target.dataset.index;
      tasks.splice(delIndex, 1);
      addList(tasks);
      showTask();
    } else if (e.target.classList.contains('sta')) {
      const staIndex = e.target.dataset.index;
      if (tasks[staIndex].status === '作業中') {
        tasks[staIndex].status = '完了';
      } else {
        tasks[staIndex].status = '作業中';
      }
      addList(tasks);
      showTask();
    } else if (e.target.classList.contains('status')) {
      addList(tasks);
      showTask();
    }
  });

}