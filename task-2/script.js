"use strict";
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
function addTask() {
    if (inputBox.value.trim() === "") {
        alert("You have to write something");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = `${inputBox.value}
        <button onclick="editTask(this)">Edit</button>
        <button onclick="removeTask(this)">Remove</button>
         `;
        listContainer.appendChild(li);
    }
    inputBox.value = "";
}
function removeTask(button) {
    let li = button.parentElement;
    listContainer.removeChild(li);
}
function editTask(button) {
    var _a;
    let li = button.parentElement;
    let tasktext = li.firstChild ? ((_a = li.firstChild.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "" : "";
    inputBox.value = tasktext;
    inputBox.focus();
    listContainer.removeChild(li);
}
