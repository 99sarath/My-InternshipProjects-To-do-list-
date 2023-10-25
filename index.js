document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.querySelector('.task-input input');
    const taskBox = document.querySelector('.task-box');
    const filters = document.querySelector('.filters');
    const clearBtn = document.querySelector('.clear-btn');
    const currentTimeDiv = document.getElementById('current-time');
  
    taskInput.addEventListener('keypress', function (event) {
      if (event.key === 'Enter' && taskInput.value.trim() !== '') {
        const taskText = taskInput.value.trim();
        addTask(taskText);
        taskInput.value = '';
      }
    });
  
    function updateTime() {
      const now = new Date();
      const timeString = now.toLocaleTimeString();
      currentTimeDiv.textContent =  timeString;
    }
  
    updateTime();
  
    setInterval(updateTime, 1000);
  
    function addTask(taskText) {
      const taskItem = document.createElement('li');
      taskItem.innerHTML = `
        <input type="checkbox">
        <span>${taskText}</span>
        <button class="delete-btn">Delete</button>
      `;
      taskBox.appendChild(taskItem);
  
      const checkbox = taskItem.querySelector('input[type="checkbox"]');
      checkbox.addEventListener('change', function () {
        taskItem.classList.toggle('completed', checkbox.checked);
      });
  
      const deleteBtn = taskItem.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', function () {
        taskItem.remove();
      });
    }
    function changeBackgroundImage() {
        const now = new Date();
        const currentTime = now.getHours();
        const body = document.body;
      
        if (currentTime >= 0 && currentTime < 18) {
          body.style.backgroundImage = "url('morning.jpg')";
        }
        else {
          body.style.backgroundImage = "url('night.jpg')";
        }
      }
      
      changeBackgroundImage();
      
      setInterval(changeBackgroundImage, 60000);
      
  
    filters.addEventListener('click', function (event) {
      if (event.target.id === 'all') {
        Array.from(taskBox.children).forEach((taskItem) => taskItem.style.display = 'block');
      } else if (event.target.id === 'pending') {
        Array.from(taskBox.children).forEach((taskItem) => {
          if (!taskItem.classList.contains('completed')) {
            taskItem.style.display = 'block';
          } else {
            taskItem.style.display = 'none';
          }
        });
      } else if (event.target.id === 'completed') {
        Array.from(taskBox.children).forEach((taskItem) => {
          if (taskItem.classList.contains('completed')) {
            taskItem.style.display = 'block';
          } else {
            taskItem.style.display = 'none';
          }
        });
      }
      document.querySelector('.active').classList.remove('active');
      event.target.classList.add('active');
    });

  
  });
  