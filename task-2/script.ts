const inputBox = document.getElementById("input-box") as HTMLInputElement;
const listContainer = document.getElementById("list-container")as HTMLUListElement;

function addTask():void {
    if (inputBox.value.trim() === "") {
        alert("You have to write something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = `${inputBox.value}
        <button onclick="editTask(this)">Edit</button>
        <button onclick="removeTask(this)">Remove</button>
         ` ;
        listContainer.appendChild(li);
    }
    inputBox.value = "";
}

function removeTask(button:HTMLButtonElement):void{
    let li = button.parentElement as HTMLElement ;
    listContainer.removeChild(li);
}
function editTask(button:HTMLButtonElement):void {

    let li = button.parentElement as HTMLElement;
    let tasktext = li.firstChild ? li.firstChild.textContent?.trim() || "" : "";
    inputBox.value = tasktext;
    inputBox.focus();
    



    listContainer.removeChild(li);
}

