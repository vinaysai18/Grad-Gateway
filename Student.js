let appliedJobs=[];
let currentJob="";

function showSection(id,btn){
    document.querySelectorAll(".section").forEach(sec=>sec.classList.remove("active"));
    document.getElementById(id).classList.add("active");

    document.querySelectorAll(".nav-btn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
}

function openModal(title,company,location,pack,desc){
    document.getElementById("modalTitle").innerText=title;
    document.getElementById("modalCompany").innerText=company;
    document.getElementById("modalLocation").innerText=location;
    document.getElementById("modalPackage").innerText=pack;
    document.getElementById("modalDesc").innerText=desc;

    currentJob=title+"-"+company;

    let btn=document.getElementById("applyButton");

    if(appliedJobs.includes(currentJob)){
        btn.innerText="Applied";
        btn.classList.add("disabled");
        btn.disabled=true;
    }else{
        btn.innerText="Apply Now";
        btn.classList.remove("disabled");
        btn.disabled=false;
    }

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
    document.getElementById("totalCount").innerText = appliedJobs.length;

    alert("Application Submitted Successfully!");

    let btn=document.getElementById("applyButton");
    btn.innerText="Applied";
    btn.classList.add("disabled");
    btn.disabled=true;

    let row=document.createElement("div");
    row.className="applied-row";
    row.innerHTML=
        `<div><strong>${currentJob}</strong></div>
         <div class="status">Pending</div>`;

    document.getElementById("appliedList").appendChild(row);
}