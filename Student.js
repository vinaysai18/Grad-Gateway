let appliedJobs=[];
let currentJob="";
let applicationCount=0;

function showSection(id, btn){
    document.querySelectorAll(".section").forEach(sec=>{
        sec.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");

    document.querySelectorAll(".nav-btn").forEach(b=>{
        b.classList.remove("active");
    });
    btn.classList.add("active");
}

function viewJob(title,company,location,pack,desc){
    document.getElementById("modalTitle").innerText=title;
    document.getElementById("modalCompany").innerText=company;
    document.getElementById("modalLocation").innerText=location;
    document.getElementById("modalPackage").innerText=pack;
    document.getElementById("modalDescription").innerText=desc;
    currentJob=title+" - "+company;
    document.getElementById("jobModal").style.display="block";
}

function closeModal(){
    document.getElementById("jobModal").style.display="none";
}

function applyJob(){
    if(appliedJobs.includes(currentJob)){
        alert("Already Applied!");
        return;
    }

    appliedJobs.push(currentJob);
    applicationCount++;
    document.getElementById("applicationCount").innerText=applicationCount;

    let list=document.getElementById("appliedList");
    if(list.innerHTML.includes("No applications yet")){
        list.innerHTML="";
    }

    let li=document.createElement("li");
    li.innerText=currentJob;
    list.appendChild(li);

    closeModal();
    alert("Application Submitted Successfully!");
}