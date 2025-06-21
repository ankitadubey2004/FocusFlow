const BACKEND_URL = 'https://smart-task-tracker-backend-1.onrender.com'; 
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const monthSelect = document.getElementById("month");
  const yearSelect = document.getElementById("year");
  const calendar = document.getElementById("calendar");
  const createTaskBtn = document.querySelector(".create-task-btn");
  const modal = document.getElementById("taskPopup");
  const closeModalBtn = document.getElementById("close-modal");
  const form = document.getElementById("taskform");
  const taskListContainer = document.querySelector(".task-list");
  const logoutBtn = document.getElementById('logoutBtn');

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const priorityValue = { high: 1, medium: 2, low: 3 };

  let tasks = [];

  // Date & Time
  function updateDateTime() {
    const dateElem = document.getElementById('currentDate');
    const timeElem = document.getElementById('currentTime');

    const now = new Date();
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };

    if (dateElem) dateElem.textContent = now.toLocaleDateString('en-US', optionsDate);
    if (timeElem) timeElem.textContent = now.toLocaleTimeString('en-US', optionsTime);
  }

  // Calendar Generation
  function generateCalendar(month, year) {
    calendar.innerHTML = "";
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach((day) => {
      const th = document.createElement("th");
      th.innerText = day;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    let date = 1;

    for (let i = 0; i < 6; i++) {
      const row = document.createElement("tr");

      for (let j = 0; j < 7; j++) {
        const cell = document.createElement("td");
        if (i === 0 && j < firstDay) {
          cell.innerText = "";
        } else if (date > daysInMonth) {
          break;
        } else {
          cell.innerText = date;
          if (date === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            cell.classList.add("today");
          }
          date++;
        }
        row.appendChild(cell);
      }
      tbody.appendChild(row);
    }

    table.appendChild(tbody);
    calendar.appendChild(table);
  }

  // Profile
  function updateUserProfile() {
    const name = localStorage.getItem('name') || 'User';
    const role = localStorage.getItem('role') || 'Role';
    const image = localStorage.getItem('image') || 'assets/images/default.png';

    document.getElementById("navProfileName").textContent = name;
    document.getElementById("navProfileImg").src = image;
    document.getElementById("profileName").textContent = name;
    document.getElementById("profileRole").textContent = role;
    document.getElementById("profileImage").src = image;
    document.getElementById("profileImage").alt = name;
    const welcomeText = document.getElementById("welcome-text");
    if (welcomeText) welcomeText.innerHTML = `Hi ${name},<br>Welcome Back!`;
  }

  // Load Tasks from backend
  async function loadTasks() {
    try {
      const res = await fetch(BACKEND_URL);
      tasks = await res.json();
      tasks.sort((a, b) => priorityValue[a.priority] - priorityValue[b.priority]);
      renderTasks();
    } catch (err) {
      console.error('Failed to load tasks:', err);
    }
  }

  // Render Tasks
  function renderTasks() {
    taskListContainer.innerHTML = "";
    tasks.forEach((task, index) => {
      const row = document.createElement("div");
      row.className = "task-row";
      row.innerHTML = `
        <span><strong>• ${task.title}</strong></span>
        <span>${task.category}</span>
        <span>${task.deadline}</span>
        <span style="color:${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'orange' : 'green'}">${task.priority}</span>
        <span><button data-id="${task._id}" class="delete-btn">Delete</button></span>
      `;

      row.querySelector(".delete-btn").addEventListener("click", async () => {
        const id = task._id;
        try {
          await fetch(`${BACKEND_URL}/${id}`, { method: "DELETE" });
          tasks = tasks.filter(t => t._id !== id);
          renderTasks();
        } catch (err) {
          console.error("Delete failed:", err);
        }
      });

      taskListContainer.appendChild(row);
    });
  }

  // Save Task to backend
  async function saveTask(task) {
    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });
      const newTask = await res.json();
      tasks.push(newTask);
      tasks.sort((a, b) => priorityValue[a.priority] - priorityValue[b.priority]);
      renderTasks();
    } catch (err) {
      console.error("Save failed:", err);
    }
  }

  // Event Listeners
  createTaskBtn?.addEventListener("click", () => modal?.classList.remove("hidden"));
  closeModalBtn?.addEventListener("click", () => modal?.classList.add("hidden"));
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal?.classList.add("hidden");
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("task-title").value.trim();
    const category = document.getElementById("task-category").value.trim();
    const deadline = document.getElementById("task-deadline").value;
    const priority = document.getElementById("task-priority").value;

    if (!title || !category || !deadline || !priority) {
      alert("Please fill in all fields.");
      return;
    }

    saveTask({ title, category, deadline, priority });
    form.reset();
    modal.classList.add("hidden");
  });

  // Dropdowns
  monthSelect.selectedIndex = currentMonth;
  for (let i = 0; i < yearSelect.options.length; i++) {
    if (parseInt(yearSelect.options[i].value) === currentYear) {
      yearSelect.selectedIndex = i;
      break;
    }
  }

  monthSelect.addEventListener("change", () => {
    generateCalendar(monthSelect.selectedIndex, parseInt(yearSelect.value));
  });
  yearSelect.addEventListener("change", () => {
    generateCalendar(monthSelect.selectedIndex, parseInt(yearSelect.value));
  });

  // Logout
  logoutBtn?.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = 'login.html';
  });

  // Init
  updateDateTime();
  updateUserProfile();
  generateCalendar(currentMonth, currentYear);
  loadTasks();
});
