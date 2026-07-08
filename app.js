function showPage(pageId){

document
.querySelectorAll(".page")
.forEach(page=>{

page.classList.remove("active");

});

document
.getElementById(pageId)
.classList.add("active");

}

dashboardBtn.onclick=()=>showPage("dashboardPage");

newBtn.onclick=()=>showPage("newPage");

calendarBtn.onclick=()=>showPage("calendarPage");

statsBtn.onclick=()=>showPage("statsPage");

const kipGrid=document.getElementById("kipGrid");

for(let i=1;i<=10;i++){

    const b=document.createElement("button");

    b.className="kipButton";

    b.textContent=i;

    b.onclick=()=>{

        document
        .querySelectorAll(".kipButton")
        .forEach(btn=>btn.style.background="#2563eb");

        b.style.background="#ef4444";

    };

    kipGrid.appendChild(b);

}
