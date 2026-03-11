let selectedRole = "student";

const studentBtn = document.getElementById("studentBtn");
const employeeBtn = document.getElementById("employeeBtn");
const emailInput = document.getElementById("email");

studentBtn.onclick = () => {
    selectedRole = "student";
    studentBtn.classList.add("active");
    employeeBtn.classList.remove("active");
    emailInput.placeholder = "Enter Student Email";
};

employeeBtn.onclick = () => {
    selectedRole = "employee";
    employeeBtn.classList.add("active");
    studentBtn.classList.remove("active");
    emailInput.placeholder = "Enter Employee Email";
};

document.getElementById("authForm").onsubmit = function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (selectedRole === "student" && !email.endsWith("@rguktrkv.ac.in")) {
        alert("Only RGUKT students can login.");
        return;
    }

    localStorage.setItem("username", username);

    if (selectedRole === "student") {
        window.location.href = "Student_Dashboard.html";
    } else {
        window.location.href = "Employee_Dashboard.html";
    }
};