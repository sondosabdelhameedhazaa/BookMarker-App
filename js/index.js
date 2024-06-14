var siteNameInput =document.getElementById("bookmarkName");
var siteUrlInput =document.getElementById("bookmarkURL");
var tableContent =document.getElementById("tableContent");
var submitBtn =document.getElementById("submitBtn");
var searchInput = document.getElementById("search");

 var bookMarks = [];
 var bookmarkToBeUpdated;
 

if(localStorage.bookMarks!= null){
 bookMarks =JSON.parse(localStorage.bookMarks);
 display(bookMarks);
}

// add bookmark
submitBtn.addEventListener("click",function(){
    if(validateUrl() == true && siteNameInput.value != ""){
    var newBookMark ={
        bookmarkName: siteNameInput.value,
        bookmarkURL: siteUrlInput.value,
      
    };
    bookMarks.push(newBookMark)
    localStorage.setItem('bookMarks',JSON.stringify(bookMarks));
    display(bookMarks);
    clearData();
}
else{
    Swal.fire({
      icon: "error",
      title: "Invalid Data",
      text: `${validateUrl() == false? "please Enter Valid Url" : ""} ${siteNameInput.value=" " ? "& please Enter Site Name": ""}`,
    });
}
})

function display(arr){
    var cartoona=``;
    for(var i = 0 ; i < arr.length ; i++){
       cartoona+=`
                <tr>
                    <td>${i}</td>
                    <td>${arr[i].bookmarkName}</td>
                    <td><a class="btn bg-visit" href="${arr[i].bookmarkURL}" target ="_blank"><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
                    <td><button class="btn bg-update" onclick="preUpdate(${i})">Update</button></td>
                    <td><button class="btn bg-delete" onclick="deleteBookMark(${i})"><i class="fa-solid fa-trash-can"></i>Delete</button></td>
                </tr>
       `;
    }
    tableContent.innerHTML =cartoona;
}

function preUpdate(index){
    bookmarkToBeUpdated= index
    siteNameInput.value=bookMarks[index].bookmarkName;
    siteUrlInput.value=bookMarks[index].bookmarkURL;
    displayUpdateBtn();
}

function displayUpdateBtn(){
 document.getElementById("submitBtn").classList.replace('d-block','d-none');
 document.getElementById("updateBtn").classList.replace('d-none','d-block');
}

function displaySubmitBtn(){
    document.getElementById("submitBtn").classList.replace('d-none','d-block');
    document.getElementById("updateBtn").classList.replace('d-block','d-none');
}

function finalUpdate(){

    var newBookMark ={
        bookmarkName: siteNameInput.value,
        bookmarkURL: siteUrlInput.value
    };
    bookMarks.splice(bookmarkToBeUpdated , 1 , newBookMark);
    localStorage.setItem("bookMarks",JSON.stringify(bookMarks));
    display(bookMarks);
    displaySubmitBtn();
    clearData();
}

function deleteBookMark(index){
    bookMarks.splice(index,1)
    localStorage.setItem('bookMarks',JSON.stringify(bookMarks));
    display(bookMarks);
}

function clearData(){
    siteNameInput.value="";
    siteUrlInput.value="";
}

searchInput.addEventListener('input',function(e){
    var searchresult=[];
    for(var i = 0; i < bookMarks.length ; i++){
        if(bookMarks[i].bookmarkName.toLowerCase().includes(e.target.value.toLowerCase())){
            searchresult.push(bookMarks[i]);
        }
    }
    display(searchresult);
})

function validateUrl(){
    var pattern =/[-a-zA-Z0-9@:%.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%\+.~#?&//=]*)/gi;
     return pattern.test(siteUrlInput.value);
}