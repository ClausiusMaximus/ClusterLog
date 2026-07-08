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
