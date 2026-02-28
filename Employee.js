function showSection(id){
    document.querySelectorAll(".section").forEach(sec=>{
        sec.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");
}

function logout(){
    window.location.href="Login_page.html";
}

function addJob(){
    let company=document.getElementById("company").value;
    let role=document.getElementById("role").value;
    let pack=document.getElementById("package").value;
    let desc=document.getElementById("description").value;

    if(company==="" || role===""){
        alert("Please fill required fields!");
        return;
    }

    let jobDiv=document.createElement("div");
    jobDiv.className="job-item";
    jobDiv.innerHTML=
        "<h4>"+role+"</h4>"+
        "<p><strong>Company:</strong> "+company+"</p>"+
        "<p><strong>Package:</strong> "+pack+"</p>"+
        "<p>"+desc+"</p>";

    document.getElementById("jobList").appendChild(jobDiv);

    document.getElementById("company").value="";
    document.getElementById("role").value="";
    document.getElementById("package").value="";
    document.getElementById("description").value="";

    alert("Job Posted Successfully!");

    showSection("jobs");
}