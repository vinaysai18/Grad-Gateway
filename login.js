let selectedRole = "student";
    let isLogin = true;

    const studentBtn = document.getElementById("studentBtn");
    const employeeBtn = document.getElementById("employeeBtn");
    const switchForm = document.getElementById("switchForm");
    const formTitle = document.getElementById("formTitle");
    const submitBtn = document.getElementById("submitBtn");
    const requirementsBox = document.getElementById("requirementsBox");
    const emailInput=document.getElementById("email");

    studentBtn.onclick = () => {
        selectedRole = "student";
        studentBtn.classList.add("active");
        employeeBtn.classList.remove("active");
        emailInput.placeholder="Enter Student Email"
    };

    employeeBtn.onclick = () => {
        selectedRole = "employee";
        employeeBtn.classList.add("active");
        studentBtn.classList.remove("active");
        emailInput.placeholder="Enter Employee Email"
    };

    switchForm.onclick = () => {
        isLogin = !isLogin;

        if (isLogin) {
            formTitle.textContent = "Login";
            submitBtn.textContent = "Login";
            switchForm.textContent = "Don't have an account? Register";
            requirementsBox.style.display = "none";
        } else {
            formTitle.textContent = "Register";
            submitBtn.textContent = "Register";
            switchForm.textContent = "Already have an account? Login";
            requirementsBox.style.display = "block";
        }
    };

    document.getElementById("authForm").onsubmit = function(e) {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!isLogin) {
            if (password.length < 6) {
                alert("Password must be at least 6 characters.");
                return;
            }

            if (selectedRole === "student" &&
                !email.endsWith("@rguktrkv.ac.in")) {
                alert("Student email must end with @rguktrkv.ac.in");
                return;
            }

            alert("Registration Successful!");
            return;
        }
        if (selectedRole === "student" &&
            !email.endsWith("@rguktrkv.ac.in")) {
            alert("Only RGUKT students can login.");
            return;
        }

        if (selectedRole === "student") {
            window.location.href = "Student_Dashboard.html";
        } else {
            window.location.href = "Employee_Dashboard.html";
        }
    };