
const session = JSON.parse(sessionStorage.getItem("crudzaso_session"));

if (!session) {
  window.location.href = "index.html";
}
const title =document.getElementById("title")
title.textContent =`Hello, ${session.name}`

//-----------------------------------
// ---------- SELECCIÓN DE ELEMENTOS
const formHabits = document.querySelector('#formHabits');
const saveHabitButton = document.querySelector('#saveHabitButton');

//----------- CARGAMOS LAS TRAEAS QUE HAY EN EL LOCALSTORAGE Y SI NO HAY CREAMOS EL ARRAY DONDE SE GUARDARAN
const habits = JSON.parse(localStorage.getItem("habits")) || [];
let selectedHabitsIndex = null;
showHabits();

// ---------- BOTÓN GUARDAR
saveHabitButton.addEventListener("click", function (e) {
  e.preventDefault();
  saveHabit();
});




function saveHabit() {

  if (!validateHabitInput())
    return;

  const newHabit = {
    title: document.getElementById('habitTitle').value,
    frequency: document.getElementById('habitFrequency').value,
    priority: document.getElementById('habitPriority').value,
    status: document.getElementById('habitStatus').value
    
  };

  
  if (selectedHabitsIndex !== null) {
    habits[selectedHabitsIndex] = newHabit;
  } else {
    habits.push(newHabit);
  }

  localStorage.setItem("habits", JSON.stringify(habits));
  showHabits();
  cleanModal();

  selectedHabitsIndex = null;

  //bootstrap.Modal.getInstance(document.querySelector('#createTaskModal')).hide();
}

function validateHabitInput() {
  const title = document.getElementById('habitTitle');
  if (title.value.trim() === '' ) {
    alert('Please fill in all required fields: Title.');
    return false;
  }
  return true;
}

// ---------- MOSTRAR TAREAS
function showHabits() {
  formHabits.innerHTML = ""; 

  habits.forEach((habit, index) => {
    const habitContainer = document.createElement('div');
    habitContainer.style.width = "18rem";
    habitContainer.style.margin = "10px";

    habitContainer.innerHTML = `
                          <div class="card m-2" style="width: 18rem;">
                            <div class="card-body col" data-status="${habit.status.toLowerCase()}">
                                <h5 class="card-title">${habit.title}</h5>
                                <p class="card-text">Frequency: ${habit.frequency}</p>
                                <p class="card-text">Priority: ${habit.priority}</p>
                                <p class="card-text">Status: ${habit.status}</p>
                                <hr>
                                <button type="button" class="btn btn-outline-primary edit-btn">Edit</button>
                                <button type="button" class="btn btn-outline-danger delete-btn">Delete</button>
                            </div>
                          </div>  
    `;
    habitContainer
      .querySelector(".delete-btn")
      .addEventListener("click",  () =>  {
            if (confirm("¿Seguro que quieres eliminar la tarea?")) {
              habits.splice(index, 1);
              localStorage.setItem("habits", JSON.stringify(habits));
              showHabits();
                  }
          });

          habitContainer
          .querySelector(".edit-btn")
          .addEventListener("click", () =>{
            selectedHabitsIndex = index;

            document.getElementById('habitTitle').value = habit.title;
            document.getElementById('habitFrequency').value = habit.frequency;
            document.getElementById('habitPriority').value = habit.priority;
            document.getElementById('habitStatus').value = habit.status;

    saveHabitButton.innerText = "Update Habit";
          })
    formHabits.append(habitContainer);
  });
}

// ---------- LIMPIAR MODAL
function cleanModal() {
  document.getElementById('habitTitle').value = "";
  document.getElementById('habitPriority').value = "low";
  document.getElementById('habitFrequency').value = "Daily";
  document.getElementById('habitStatus').value = "Pending";
}

// ---------- FILTRAR TAREAS

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        const statusSelected = btn.textContent.trim().toLowerCase();
        const cards = document.querySelectorAll(".card-body");

        let found = false;

        cards.forEach(card => {
            const status = card.dataset.status;

            if (status === statusSelected) {
                card.style.display = "";
                found = true;
            } else {
                card.style.display = "none";
            }
        });

        if (!found) {
            alert("No tasks found with the selected priority.");
        }
    });
});


//CONTADOR
document.addEventListener("DOMContentLoaded", () => {
  updateCounters();
});
function updateCounters() {
  const total = habits.length;

  const pending = habits.filter(h => h.status.trim().toLowerCase() === "pending").length;
  const progress = habits.filter(h => h.status.trim().toLowerCase()=== "in progress").length;
  const completed = habits.filter(h => h.status.trim().toLowerCase() === "completed").length;

  document.getElementById("count-total").textContent = total;
  document.getElementById("count-pending").textContent = pending;
  document.getElementById("count-progress").textContent = progress;
  document.getElementById("count-completed").textContent = completed;
}
