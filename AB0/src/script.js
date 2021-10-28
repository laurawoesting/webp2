/*****************************************************************************
 * Class and enum declaration                                                *
 *****************************************************************************/
// Class representing a user
class User {
    constructor(firstName, lastName, animalname, animalbirthday, animalgender, creationDate) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.animalname = animalname;
        this.animalbirthday = animalbirthday;
        this.animalgender = animalgender;
        this.creationDate = creationDate;
        this.id = User.userCounter++;
    }
}
User.userCounter = 1;
class Animal {
    constructor(animalname, animalbirthday, animalgender) {
        this.animalname = animalname;
        this.animalbirthday = animalbirthday;
        this.animalgender = animalgender;
    }
}
// wie erstelle ich eine klasse mit extends und super, funnktioniert nicht
let userList = [];
let filteredUserList = [];
let animalCounter = 0;
let oldestPet = 0;
function addUser(event) {
    // Prevent the default behaviour of the browser (reloading the page)
    event.preventDefault();
    // Define JQuery HTML objects
    const addUserForm = document.getElementById('add-user-form');
    const firstNameField = document.getElementById('add-first-name-input');
    const lastNameField = document.getElementById('add-last-name-input');
    const animalnameField = document.getElementById('add-animalname-input');
    const animalbirthdayField = document.getElementById('add-animalbirthdate-input');
    const animalgenderField = document.getElementById('add-animalgender-input');
    // Read values from input fields
    const firstName = firstNameField.value.trim();
    const lastName = lastNameField.value.trim();
    const animalname = animalnameField.value.trim();
    const animalbirthday = animalbirthdayField.value.trim();
    const animalgender = animalgenderField.value.trim();
    // Check if all required fields are filled in
    if (firstName && lastName && animalname && animalbirthday && animalgender) {
        // Create new user
        const user = new User(firstName, lastName, new Date(), animalname, animalbirthday, animalgender);
        // Add user to user list
        userList.push(user);
        // Show changes on website
        renderMessage('User created');
        addUserForm.reset();
        renderUserList();
        incrementanimalCounter();
        getAge();
    }
    else {
        renderMessage('Not all mandatory fields are filled in');
    }
}
//Zählt die Anzahl aller Tiere
function incrementanimalCounter() {
    let animalCounter = 0;
    userList.forEach(user => {
        if (user.petName.length > 0) {
            animalCounter++;
        }
        document.getElementById("animalCounter").innerHTML = animalCounter.toString();
    });
}
//Ältestes Tier?
function getAge() {
    //let oldestPet: number = 0;
    let today = new Date();
    let birthDate = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
    }
    console.log();
    document.getElementById("oldestPet").innerHTML = oldestPet.toString();
    return age;
}
function editUser(event) {
    // Prevent the default behaviour of the browser (reloading the page)
    event.preventDefault();
    // Define JQuery HTML objects
    const editModal = document.getElementById('edit-user-modal');
    const editUserForm = document.getElementById('edit-user-form');
    const firstNameInput = document.getElementById('edit-first-name-input');
    const lastNameInput = document.getElementById('edit-last-name-input');
    const animalnameInput = document.getElementById('edit-animalname-input');
    const animalbirthdayInput = document.getElementById('edit-animalbirthday-input');
    const animalgenderInput = document.getElementById('edit-animalgender-input');
    const idHiddenInput = document.getElementById('edit-id-input');
    // Read values from input fields
    const userId = Number(idHiddenInput.value);
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const animalname = animalnameInput.value.trim();
    const animalbirthday = animalbirthdayInput.value.trim();
    const animalgender = animalgenderInput.value.trim();
    if (firstName && lastName && animalname && animalbirthday && animalgender) {
        // iterate through userList until user found (or end of list)
        for (const user of userList) {
            if (user.id === userId) {
                user.firstName = firstName;
                user.lastName = lastName;
                user.animalname = animalname;
                user.animalbirthday = animalbirthday;
                user.animalgender = animalgender;
                // Show success message and changes
                renderMessage(`Successfully updated user ${user.firstName} ${user.lastName} ${user.animalname} ${user.animalbirthday} ${user.animalgender}
        `);
                editUserForm.reset();
                renderUserList();
                bootstrap.Modal.getInstance(editModal).hide();
                return; // leave function when found
            }
        }
        // The user could not be found, show error message
        renderMessage('The user to update could not be found');
    }
    else {
        renderMessage('Not all mandatory fields are filled in');
    }
    bootstrap.Modal.getInstance(editModal).hide();
}
function deleteUser(event) {
    // Get user id from button attribute 'data-user-id'
    const userId = Number(event.target.getAttribute('data-user-id'));
    // Create a new array without the user to delete
    userList = userList.filter((user) => user.id !== userId);
    renderMessage('User deleted');
    renderUserList();
}
function openEditUserModal(event) {
    // Get user id from button attribute 'data-user-id'
    const userId = Number(event.target.getAttribute('data-user-id'));
    // Define JQuery HTML objects
    const editUserModal = new bootstrap.Modal(document.getElementById('edit-user-modal'), {});
    const editIdInput = document.getElementById('edit-id-input'); // Hidden field for saving the user's id
    const editFirstNameInput = document.getElementById('edit-first-name-input');
    const editLastNameInput = document.getElementById('edit-last-name-input');
    // iterate through list until user found (or end of list)
    for (const user of userList) {
        if (user.id === userId) {
            // Fill in edit fields in modal
            editIdInput.value = String(user.id);
            editFirstNameInput.value = user.firstName;
            editLastNameInput.value = user.lastName;
            // Show modal
            editUserModal.show();
            renderUserList();
            return; // leave function when found
        }
    }
    renderMessage('The selected user can not be found');
}
//Suchfunktion
document.getElementById("search").addEventListener("keyup", function () {
    const userSearchvalue = document.getElementById("search").value;
    //es wird überprüft ob bei jedem User der wert aus der suchliste in vorname, nachname oder ähnlichem vorkommt
    const result = userList.filter(function (user) {
        // liefere die gefundenen user zurück und speichere den wert in result
        return (user.firstName + " " + user.lastName + +" " + +" " + ).includes(userSearchvalue);
    });
    //Speicher alle User von Result in filteredUserList
    filteredUserList = result;
    renderUserList();
});
// liste Sortieren
document.getElementById("sort").addEventListener("change", function () {
    // get select sorting mode
    const sortMode = parseInt(document.getElementById("sort").value);
    // sort functions
    const sortFunctionList = {
        // sort by index
        1: (a, b) => {
            return (a.id < b.id ? -1 : (a.id > b.id ? 1 : 0));
        },
        // sort by firstname up
        2: (a, b) => {
            return (a.firstName < b.firstName ? -1 : (a.firstName > b.firstName ? 1 : 0));
        },
        // sort by firstname down
        3: (a, b) => {
            return (a.firstName < b.firstName ? 1 : (a.firstName > b.firstName ? -1 : 0));
        },
        // sort by lastname up
        4: (a, b) => {
            return (a.lastName < b.lastName ? -1 : (a.lastName > b.lastName ? 1 : 0));
        },
        // sort by lastname down
        5: (a, b) => {
            return (a.lastName < b.lastName ? 1 : (a.lastName > b.lastName ? -1 : 0));
        },
    };
    // create new sorted array with sort function selected by the selected sortMode number
    const result = userList.sort(sortFunctionList[sortMode]);
    // set new list
    filteredUserList = userList.sort();
    renderUserList();
});
/*********
 * Modal
 */
//Get the modal
let modal = document.getElementById("myModal");
// Get the button that opens the modal
let btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
};
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
/*****************************************************************************
 * Render functions                                                          *
 *****************************************************************************/
function renderMessage(message) {
    // Define JQuery HTML Objects
    const messageWindow = document.getElementById('messages');
    // Create new alert as HTML Element
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', 'alert-warning', 'alert-dismissible', 'fade', 'show');
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
    // Convert to Bootstrap Alert type
    const alert = new bootstrap.Alert(alertDiv);
    // Add message to DOM
    messageWindow.append(alertDiv);
    // Auto-remove message after 5 seconds (5000ms)
    setTimeout(() => {
        alert.close();
    }, 5000);
}
function renderUserList() {
    // Define HTML objects
    const userTableBody = document.getElementById('user-table-body');
    // Delete the old table of users from the DOM
    userTableBody.innerHTML = ``;
    // For each user create a row and append it to the user table
    for (const user of userList) {
        // Create html table row element...
        const tableEntry = document.createElement('tr');
        tableEntry.innerHTML = `
                <td>${user.id}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>
                    <button class="btn btn-outline-dark btn-sm edit-user-button mr-4 fa fa-pencil" data-user-id="${user.id}"></button>
                    <button class="btn btn-outline-dark btn-sm delete-user-button fa fa-trash" data-user-id="${user.id}"></button>
                </td>`;
        // ... and append it to the table's body
        userTableBody.append(tableEntry);
    }
}
/*****************************************************************************
 * Main Callback: Wait for DOM to be fully loaded                            *
 *****************************************************************************/
document.addEventListener('DOMContentLoaded', () => {
    const addUserForm = document.getElementById('add-user-form');
    const editUserForm = document.getElementById('edit-user-form');
    const userTableBody = document.getElementById('user-table-body');
    // Register listeners
    addUserForm.addEventListener('submit', addUser);
    editUserForm.addEventListener('submit', editUser);
    userTableBody.addEventListener('click', (event) => {
        const eventTarget = event.target;
        if (eventTarget.matches('.edit-user-button')) {
            openEditUserModal(event);
        }
        else if (eventTarget.matches('.delete-user-button')) {
            deleteUser(event);
        }
    });
});
//# sourceMappingURL=script.js.map