/*****************************************************************************
 * Class and enum declaration                                                *
 *****************************************************************************/

// User Klasse erstellen mit Vornamen, Nachnamen
class User {
  private static userCounter: number = 1;
  public id: number;
  public firstName: string;
  public lastName: string;
  public creationDate: Date;
  public animal: Animal

  constructor(firstName: string, lastName: string, creationDate: Date, animalname: string, animalbirthday: number, animalgender: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.creationDate = creationDate;
    this.animal = new Animal(animalname, animalbirthday, animalgender);
    this.id = User.userCounter++;
  }
}
// animal klasse erstellen
class Animal {
  public animalname: string;
  public animalbirthday: number;
  public animalgender: string;

  constructor(animalname: string, animalbirthday: number, animalgender: string) {
    this.animalname = animalname;
    this.animalbirthday = animalbirthday;
    this.animalgender = animalgender;
  }
}
 // wie erstelle ich eine klasse mit extends und super, funnktioniert nicht

let userList: User[] = [];
let filteredUserList: User[] = [];
let animalCounter: number = 0;
let oldestPet: number = 0;

function addUser(event) {
  // Prevent the default behaviour of the browser (reloading the page)
  event.preventDefault();

  // Define JQuery HTML objects
  const addUserForm: HTMLFormElement = document.getElementById('add-user-form') as HTMLFormElement;
  const firstNameField: HTMLInputElement = document.getElementById('add-first-name-input') as HTMLInputElement;
  const lastNameField: HTMLInputElement = document.getElementById('add-last-name-input') as HTMLInputElement;
  const animalnameField: HTMLInputElement = document.getElementById('add-animalname-input') as HTMLInputElement;
  const animalbirthdayField: HTMLInputElement = document.getElementById('add-animalbirthdate-input') as HTMLInputElement;
  const animalgenderField: HTMLInputElement = document.getElementById('add-animalgender-input') as HTMLInputElement;

  // Read values from input fields
  const firstName: string = firstNameField.value.trim();
  const lastName: string = lastNameField.value.trim();
  const animalname: string = animalnameField.value.trim();
  const animalbirthday: number = parseInt(animalbirthdayField.value.toString());
  const animalgender: string= animalgenderField.value.trim();

  // Check if all required fields are filled in
  if (firstName && lastName && animalname && animalbirthday && animalgender) {
    // Create new user
    const user: User = new User(firstName, lastName, new Date(), animalname, animalbirthday, animalgender);
    // Add user to user list
    userList.push(user);
    // Show changes on website
    renderMessage('User created');
    addUserForm.reset();
    renderUserList();
    incrementanimalCounter();
    getAge();
  } else {
    renderMessage('Not all mandatory fields are filled in');
  }

}
//Zählt die Anzahl aller Tiere
// durch Inkrement wird immer ein neues Tier erzeugt = +1
function incrementanimalCounter() {
  let animalCounter: number = 0;
  userList.forEach(user => {
    if (user.animal.animalname.length > 0) {
      animalCounter++;
    }
    document.getElementById("animalCounter").innerHTML = animalCounter.toString();
  })
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
  console.log()
  document.getElementById("oldestanimal").innerHTML = oldestPet.toString();
  return age;

}

function editUser(event) {
  // Prevent the default behaviour of the browser (reloading the page)
  event.preventDefault();

  // Define JQuery HTML objects
  const editModal: HTMLElement = document.getElementById('edit-user-modal');
  const editUserForm: HTMLFormElement = document.getElementById('edit-user-form') as HTMLFormElement;
  const firstNameInput: HTMLInputElement = document.getElementById('edit-first-name-input') as HTMLInputElement;
  const lastNameInput: HTMLInputElement = document.getElementById('edit-last-name-input') as HTMLInputElement;
  const animalnameInput: HTMLInputElement = document.getElementById('edit-animalname-input') as HTMLInputElement;
  const animalbirthdayInput: HTMLInputElement = document.getElementById('edit-animalbirthday-input') as HTMLInputElement;
  const animalgenderInput: HTMLInputElement = document.getElementById('edit-animalgender-input') as HTMLInputElement;
  const idHiddenInput: HTMLInputElement = document.getElementById('edit-id-input') as HTMLInputElement;

  // Read values from input fields
  const userId: number = Number(idHiddenInput.value);
  const firstName: string = firstNameInput.value.trim();
  const lastName: string = lastNameInput.value.trim();
  const animalname: string = animalnameInput.value.trim();
  const animalbirthday: number = parseInt(animalbirthdayInput.value.toString());
  const animalgender: string = animalgenderInput.value.trim();


  if (firstName && lastName && animalname && animalbirthday && animalgender) {
    // iterate through userList until user found (or end of list)
    for (const user of userList) {
      if (user.id === userId) {
        user.firstName = firstName;
        user.lastName = lastName;
        user.animal.animalname = animalname;
        user.animal.animalbirthday = animalbirthday;
        user.animal.animalgender = animalgender;

        // Show success message and changes
        renderMessage(`Successfully updated user ${user.firstName} ${user.lastName} ${user.animal.animalname} ${user.animal.animalbirthday} ${user.animal.animalgender}
        `);
        editUserForm.reset();
        renderUserList();
        bootstrap.Modal.getInstance(editModal).hide();
        return;  // leave function when found
      }
    }
    // The user could not be found, show error message
    renderMessage('The user to update could not be found');
  } else {
    renderMessage('Not all mandatory fields are filled in');
  }
  bootstrap.Modal.getInstance(editModal).hide();
}

function deleteUser(event) {
  // Get user id from button attribute 'data-user-id'
  const userId: number = Number(event.target.getAttribute('data-user-id'));

  // Create a new array without the user to delete
  userList = userList.filter((user) => user.id !== userId);

  renderMessage('User deleted');
  renderUserList();
}

function openEditUserModal(event) {
  // Get user id from button attribute 'data-user-id'
  const userId: number = Number(event.target.getAttribute('data-user-id'));

  // Define JQuery HTML objects
  const editUserModal: bootstrap.Modal = new bootstrap.Modal(document.getElementById('edit-user-modal'), {});
  const editIdInput: HTMLInputElement = document.getElementById('edit-id-input') as HTMLInputElement; // Hidden field for saving the user's id
  const editFirstNameInput: HTMLInputElement = document.getElementById('edit-first-name-input') as HTMLInputElement;
  const editLastNameInput: HTMLInputElement = document.getElementById('edit-last-name-input') as HTMLInputElement;

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
      return;  // leave function when found
    }
  }
  renderMessage('The selected user can not be found');
}
//Suchfunktion
document.getElementById("search").addEventListener("keyup", function () {
  const userSearchvalue = (document.getElementById("search") as HTMLInputElement).value;

  //es wird überprüft ob bei jedem User der wert aus der suchliste in vorname, nachname oder ähnlichem vorkommt

  const result = userList.filter(function (user) {
    // liefere die gefundenen user zurück und speichere den wert in result
    return (user.firstName + " " + user.lastName +  + " " + user.animal.animalname + " " + + user.animal.animalbirthday + "" + + user.animal.animalgender + "").includes(userSearchvalue);
  });
  //Speicher alle User von Result in filteredUserList
  filteredUserList = result;
  renderUserList();
})

// liste Sortieren
document.getElementById("sort").addEventListener("change", function () {
  // get select sorting mode
  const sortMode: number = parseInt((document.getElementById("sort") as HTMLInputElement).value);

  // sort functions
  const sortFunctionList = {
    // sort by index
    1: (a: User, b: User) => {
      return (a.id < b.id ? -1 : (a.id > b.id ? 1 : 0))
    },
    // sort by firstname up
    2: (a: User, b: User) => {
      return (a.firstName < b.firstName ? -1 : (a.firstName > b.firstName ? 1 : 0))
    },
    // sort by firstname down
    3: (a: User, b: User) => {
      return (a.firstName < b.firstName ? 1 : (a.firstName > b.firstName ? -1 : 0))
    },
    // sort by lastname up
    4: (a: User, b: User) => {
      return (a.lastName < b.lastName ? -1 : (a.lastName > b.lastName ? 1 : 0))
    },
    // sort by lastname down
    5: (a: User, b: User) => {
      return (a.lastName < b.lastName ? 1 : (a.lastName > b.lastName ? -1 : 0))
    },
  }

  // create new sorted array with sort function selected by the selected sortMode number
  const result = userList.sort(sortFunctionList[sortMode]);

  // set new list
  filteredUserList = userList.sort();
  renderUserList();
})
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
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



/*****************************************************************************
 * Render functions                                                          *
 *****************************************************************************/
function renderMessage(message: string) {
  // Define JQuery HTML Objects
  const messageWindow: HTMLDivElement = document.getElementById('messages') as HTMLDivElement;

  // Create new alert as HTML Element
  const alertDiv: HTMLElement = document.createElement('div')
  alertDiv.classList.add('alert', 'alert-warning', 'alert-dismissible', 'fade', 'show');
  alertDiv.setAttribute('role', 'alert');
  alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;

  // Convert to Bootstrap Alert type
  const alert: bootstrap.Alert = new bootstrap.Alert(alertDiv);

  // Add message to DOM
  messageWindow.append(alertDiv);

  // Auto-remove message after 5 seconds (5000ms)
  setTimeout(() => {
    alert.close();
  }, 5000);
}

function renderUserList() {
  // Define HTML objects
  const userTableBody: HTMLDivElement = document.getElementById('user-table-body') as HTMLDivElement;

  // Delete the old table of users from the DOM
  userTableBody.innerHTML = ``;
  // For each user create a row and append it to the user table
  for (const user of userList) {
    // Create html table row element...
    const tableEntry: HTMLTableRowElement = document.createElement('tr');
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
  const addUserForm: HTMLFormElement = document.getElementById('add-user-form') as HTMLFormElement;
  const editUserForm: HTMLFormElement = document.getElementById('edit-user-form') as HTMLFormElement;
  const userTableBody: HTMLDivElement = document.getElementById('user-table-body') as HTMLDivElement;

  // Register listeners
  addUserForm.addEventListener('submit', addUser);
  editUserForm.addEventListener('submit', editUser);
  userTableBody.addEventListener('click', (event) => {
    const eventTarget: Element = event.target as Element;
    if (eventTarget.matches('.edit-user-button')) {
      openEditUserModal(event);
    } else if (eventTarget.matches('.delete-user-button')) {
      deleteUser(event);
    }
  });
});
