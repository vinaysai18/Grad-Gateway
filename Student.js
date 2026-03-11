let appliedJobs = [];
let currentJob = "";

document.addEventListener("DOMContentLoaded", () => {
    let user = localStorage.getItem("username");
    if (user) {
        let displayUsername = document.getElementById("displayUsername");
        let profileUsername = document.getElementById("profileUsername");
        if (displayUsername) displayUsername.innerText = user;
        if (profileUsername) profileUsername.innerText = user;
    }

    // Add listener for resume upload UI
    const resumeUpload = document.getElementById("resumeUpload");
    if (resumeUpload) {
        resumeUpload.addEventListener("change", function() {
            const uploadText = document.querySelector(".upload-text");
            if (this.files && this.files.length > 0) {
                uploadText.innerText = this.files[0].name;
            } else {
                uploadText.innerText = "Click to upload or drag and drop";
            }
        });
    }
});

function showSection(id, btn) {
    document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
    document.getElementById(id).classList.add("active");

    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
}

function logout() {
    window.location.href = "login.html"
}

function openModal(title, company, location, pack, desc) {
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalCompany").innerText = company;
    document.getElementById("modalLocation").innerText = location;
    document.getElementById("modalPackage").innerText = pack;
    document.getElementById("modalDesc").innerText = desc;

    // Reset and Pre-fill application form info
    document.getElementById("applyingFor").innerText = title;
    document.getElementById("applyingAt").innerText = company;
    
    // Clear previous inputs
    document.getElementById("fullName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("resumeUpload").value = "";
    document.getElementById("gradYear").value = "2025";
    
    // Reset resume upload UI text
    const uploadText = document.querySelector(".upload-text");
    if (uploadText) {
        uploadText.innerText = "Click to upload or drag and drop";
    }

    let user = localStorage.getItem("username");
    if (user) {
        document.getElementById("fullName").value = user;
        if (user.toLowerCase().includes("kiran")) {
            document.getElementById("email").value = "chakalikiran340@gmail.com";
        }
    }

    currentJob = title + "-" + company;

    // Reset views
    document.getElementById("jobDetails").style.display = "block";
    document.getElementById("applicationForm").style.display = "none";
    document.getElementById("successView").style.display = "none";

    let btn = document.getElementById("applyButton");
    if (appliedJobs.includes(currentJob)) {
        btn.innerText = "Applied ✓";
        btn.classList.add("disabled");
        btn.disabled = true;
    } else {
        btn.innerText = "Apply Now";
        btn.classList.remove("disabled");
        btn.disabled = false;
    }

    document.getElementById("jobModal").style.display = "block";
}

function showApplicationForm() {
    document.getElementById("jobDetails").style.display = "none";
    document.getElementById("applicationForm").style.display = "block";
}

function hideApplicationForm() {
    document.getElementById("jobDetails").style.display = "block";
    document.getElementById("applicationForm").style.display = "none";
}

function submitApplication() {
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const gradYear = document.getElementById("gradYear").value;
    const resume = document.getElementById("resumeUpload").value;

    if (!fullName || !email || !phone || !resume) {
        alert("Please fill in all details and upload your resume.");
        return;
    }

    const applicationData = {
        id: 'app_' + Date.now(),
        name: fullName,
        email: email,
        phone: phone,
        gradYear: gradYear,
        jobTitle: currentJob.split('-')[0],
        company: currentJob.split('-')[1],
        appliedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        status: 'New'
    };

    // Save to localStorage
    let allApplications = JSON.parse(localStorage.getItem("jobApplications") || "[]");
    allApplications.push(applicationData);
    localStorage.setItem("jobApplications", JSON.stringify(allApplications));

    // Logic for successful application
    appliedJobs.push(currentJob);
    document.getElementById("totalCount").innerText = appliedJobs.length;

    // Show success view
    document.getElementById("applicationForm").style.display = "none";
    document.getElementById("successView").style.display = "block";
    document.getElementById("successJob").innerText = currentJob;

    // Add to applied list
    let row = document.createElement("div");
    row.className = "applied-row";
    row.innerHTML =
        `<div><strong>${currentJob}</strong></div>
         <div class="status">Pending</div>`;

    document.getElementById("appliedList").appendChild(row);
}

function closeModal() {
    document.getElementById("jobModal").style.display = "none";
}

function switchProfileTab(tab) {
    // Update tabs
    document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // Update content
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    if (tab === 'details') {
        document.getElementById('profile-details-content').classList.add('active');
    } else {
        document.getElementById('profile-resume-content').classList.add('active');
    }
}

function viewResume() {
    switchProfileTab('resume');
}
