function showSection(id){
    document.querySelectorAll(".section").forEach(sec=>{
        sec.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");
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
