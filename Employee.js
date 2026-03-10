document.addEventListener("DOMContentLoaded", () => {
    let user = localStorage.getItem("username");
    if(user) {
        let displayUsername = document.getElementById("displayUsername");
        let profileUsername = document.getElementById("profileUsername");
        if(displayUsername) displayUsername.innerText = user;
        if(profileUsername) profileUsername.innerText = user;
    }
});

function showSection(id, btn) {
    document.querySelectorAll(".section").forEach(sec => {
        sec.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");

    // Toggle active class on navbar buttons
    if (btn) {
        document.querySelectorAll(".nav-btn").forEach(navBtn => {
            navBtn.classList.remove("active");
        });
        btn.classList.add("active");
    }
}

function logout(){
    window.location.href="login.html";
}

function addJob(){
    let company=document.getElementById("company").value;
    let role=document.getElementById("role").value;
    let pack=document.getElementById("package").value;
    let location=document.getElementById("location").value;
    let desc=document.getElementById("description").value;

    if(company==="" || role===""){
        alert("Please fill required fields!");
        return;
    }

    let jobDiv=document.createElement("div");
    jobDiv.className="job-item";
    jobDiv.innerHTML=
        "<h4>"+role+"</h4>"+
        "<div class='company-name'>🏢 "+company+"</div>"+
        "<div class='job-details'>"+
        "<span>💰 "+pack+"</span>"+
        "<span>📍 "+location+"</span>"+
        "</div>"+
        "<div class='job-desc'>"+desc+"</div>"+
        "<div class='posted-date'>Posted on: "+new Date().toLocaleDateString()+"</div>";

    document.getElementById("jobList").appendChild(jobDiv);

    // Update job count
    let count = document.getElementById("jobList").children.length;
    document.getElementById("jobCount").innerText = count;

    // Clear form
    document.getElementById("company").value="";
    document.getElementById("role").value="";
    document.getElementById("package").value="";
    document.getElementById("location").value="";
    document.getElementById("description").value="";

    alert("Job Posted Successfully!");

    showSection("jobs");
}
const mockApplicants = {
    'john_doe': {
        name: 'John Doe',
        role: 'Software Engineer',
        email: 'john.doe@email.com',
        phone: '+1 234 567 8900',
        education: { university: 'MIT', degree: 'BS Computer Science', gpa: '3.8' },
        skills: ['React', 'Node.js', 'Python', 'PostgreSQL', 'AWS'],
        status: 'New'
    },
    'sarah_smith': {
        name: 'Sarah Smith',
        role: 'Data Analyst',
        email: 'sarah.s@outlook.com',
        phone: '+1 987 654 3210',
        education: { university: 'Stanford', degree: 'MS Data Science', gpa: '3.9' },
        skills: ['SQL', 'Tableau', 'R', 'Statistics', 'PowerBI'],
        status: 'Shortlisted'
    },
    'mike_johnson': {
        name: 'Mike Johnson',
        role: 'DevOps Engineer',
        email: 'mike.j@devops.pro',
        phone: '+1 456 789 0123',
        education: { university: 'UC Berkeley', degree: 'BS Information Systems', gpa: '3.7' },
        skills: ['Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'Linux'],
        status: 'Under Review'
    }
};

function updateApplicantStatus(id, newStatus) {
    mockApplicants[id].status = newStatus;
    
    // Refresh the Detail View
    const activeCard = document.querySelector('.app-card.active');
    viewApplicant(id, activeCard);
    
    // Refresh the Sidebar Card Badge
    const sidebarCards = document.querySelectorAll('.app-card');
    sidebarCards.forEach(card => {
        // Find card by comparing name or using a data-id attribute (let's use name for simplicity here)
        if (card.querySelector('h4').innerText === mockApplicants[id].name) {
            const badge = card.querySelector('.status-badge');
            badge.className = `status-badge status-${newStatus.toLowerCase().replace(' ', '-')}`;
            badge.innerText = newStatus;
        }
    });

    alert(`Applicant marked as ${newStatus}`);
}

function scheduleInterview(id) {
    updateApplicantStatus(id, 'Interview Scheduled');
}

function shortlistApplicant(id) {
    updateApplicantStatus(id, 'Shortlisted');
}

function rejectApplicant(id) {
    if (confirm('Are you sure you want to reject this applicant?')) {
        updateApplicantStatus(id, 'Rejected');
    }
}

function viewApplicant(id, element) {
    // Update active state in list
    document.querySelectorAll('.app-card').forEach(card => card.classList.remove('active'));
    element.classList.add('active');

    // Update Detail View
    const applicant = mockApplicants[id];
    const detailDiv = document.getElementById('applicantDetail');
    
    const initials = applicant.name.split(' ').map(n => n[0]).join('');
    const currentStatus = applicant.status || 'New';

    detailDiv.innerHTML = `
        <div class="detail-header">
            <div class="applicant-profile">
                <div class="avatar-large">${initials}</div>
                <div class="profile-info">
                    <h3>${applicant.name}</h3>
                    <p>${applicant.role}</p>
                    <div class="contact-row">
                        <div class="contact-item">📧 ${applicant.email}</div>
                        <div class="contact-item">📞 ${applicant.phone}</div>
                    </div>
                </div>
            </div>
            <span class="status-badge status-${currentStatus.toLowerCase().replace(' ', '-')}">${currentStatus}</span>
        </div>

        <div class="detail-section">
            <h4>🎓 Education</h4>
            <div class="edu-box">
                <h5>${applicant.education.university}</h5>
                <p>${applicant.education.degree}</p>
                <p class="gpa">GPA: ${applicant.education.gpa} / 4.0</p>
            </div>
        </div>

        <div class="detail-section">
            <h4>🛠 Skills</h4>
            <div class="skill-tags">
                ${applicant.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        </div>

        <div class="action-bar">
            <button class="btn-primary" onclick="scheduleInterview('${id}')">Schedule Interview</button>
            <button class="btn-secondary" onclick="shortlistApplicant('${id}')">Shortlist</button>
            <button class="btn-outline" onclick="rejectApplicant('${id}')">Reject</button>
        </div>
    `;
}
