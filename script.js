let studentTable = document.getElementById("studentsTable");
let modal = document.getElementById("studentModal");
let modalTitle = document.getElementById("modalTitle");
let addStudentBtn = document.getElementById("addStudentBtn");
let closeModalBtn = document.getElementById("closeModalBtn");
let saveStudentBtn = document.getElementById("saveStudentBtn");
let nameInput = document.getElementById("studentName");
let emailInput = document.getElementById("studentEmail");
let phoneInput = document.getElementById("studentPhone");
let enrollInput = document.getElementById("studentEnroll");
let dateInput = document.getElementById("studentDate");
let searchInput = document.querySelector(".search input");
let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = null;

function renderTable(list = null) {
  if (!list) {
    list = students;
  }

  studentTable.innerHTML = list
    .map(
      (student, index) => `
      <tr onclick="showStudentDetails(${index})">
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.phone}</td>
        <td>${student.enroll}</td>
        <td>${student.date}</td>
        <td class="actions">
          <button class="edit" onclick="editStudent(${index}); event.stopPropagation();">
            <i class='bx bx-edit-alt'></i>
          </button>
          <button class="delete" onclick="deleteStudent(${index}); event.stopPropagation();">
            <i class='bx bx-basket'></i>
          </button>
        </td>
      </tr>
    `
    )
    .join("");
}

searchInput.addEventListener("input", function () {
  let query = this.value.trim().toLowerCase();
  let filteredStudents = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query) ||
      student.phone.toLowerCase().includes(query) ||
      student.enroll.toLowerCase().includes(query) ||
      student.date.toLowerCase().includes(query)
    );
  });
  renderTable(filteredStudents);
});

function openModal(edit = false) {
  modal.style.display = "flex";
  modalTitle.textContent = edit ? "Edit Student" : "Add Student";
}

function closeModal() {
  modal.style.display = "none";
  clearInputs();
}

function clearInputs() {
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  enrollInput.value = "";
  dateInput.value = "";
  editIndex = null;
}

function saveStudent() {
  let student = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    enroll: enrollInput.value,
    date: dateInput.value,
  };

  if (editIndex !== null) {
    students[editIndex] = student;
  } else {
    students.push(student);
  }

  localStorage.setItem("students", JSON.stringify(students));
  renderTable();
  closeModal();
}

function editStudent(index) {
  editIndex = index;
  let student = students[index];
  nameInput.value = student.name;
  emailInput.value = student.email;
  phoneInput.value = student.phone;
  enrollInput.value = student.enroll;
  dateInput.value = student.date;
  openModal(true);
}

function deleteStudent(index) {
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  renderTable();
}

function showStudentDetails(index) {
  let student = students[index];
  let detailsModal = document.createElement("div");
  detailsModal.className = "modal details-modal";
  detailsModal.style.display = "flex";
  detailsModal.innerHTML = `
      <div class="modal-content">
        <h2 style="color: black;">Student Details</h2>
        <div class="profile-card">
          <img src="./images/header-img.png" alt="Student Picture" width="100" height="100">
          <h3 style="color: black;">Name: ${student.name}</h3>
          <p style="color: black;">Email: ${student.email}</p>
          <p style="color: black;">Phone: ${student.phone}</p>
          <p style="color: black;">Enroll Number: ${student.enroll}</p>
          <p style="color: black;">Date: ${student.date}</p>
        </div>
        <div class="modal-actions">
          <button onclick="editStudent(${index})"><i class='bx bx-edit-alt'></i></button>
          <button onclick="deleteStudent(${index})"> <i class='bx bx-basket'></i></button>
          <button onclick="this.closest('.modal').remove()">Close</button>
        </div>
      </div>
    `;
  document.body.appendChild(detailsModal);
}

addStudentBtn.addEventListener("click", () => openModal());
closeModalBtn.addEventListener("click", closeModal);
saveStudentBtn.addEventListener("click", saveStudent);

window.onload = function () {
  students = JSON.parse(localStorage.getItem("students")) || [];
  renderTable();
};

function renderTable(list = null) {
  if (!list) {
    list = students;
  }

  list.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

  studentTable.innerHTML = list
    .map(
      (student, index) => `
        <tr onclick="showStudentDetails(${index})">
          <td>${student.name}</td>
          <td>${student.email}</td>
          <td>${student.phone}</td>
          <td>${student.enroll}</td>
          <td>${student.date}</td>
          <td class="actions">
            <button class="edit" onclick="editStudent(${index}); event.stopPropagation();">
              <i class='bx bx-edit-alt'></i>
            </button>
            <button class="delete" onclick="deleteStudent(${index}); event.stopPropagation();">
              <i class='bx bx-basket'></i>
            </button>
          </td>
        </tr>
      `
    )
    .join("");
}

let sortBtn = document.getElementById("sortBtn");

sortBtn.addEventListener("click", () => {
  renderTable();
});
