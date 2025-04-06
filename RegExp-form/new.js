let submitbtn = document.getElementById("submitbtn");
let clearbtn = document.getElementById("clearbtn");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let citselect = document.getElementById("citselect");
let genders = document.getElementsByName("gender");
let hobbies = document.getElementsByName("hobbies");

let emailErrortext = document.getElementById("EmailErrortext");
let phoneErrortext = document.getElementById("phoneErrortext");
let cityErrortext = document.getElementById("cityErrortext");
let genderErrortext = document.getElementById("genderErrortext");
let hobbyErrortext = document.getElementById("hobbyErrortext");
let resultTable = document.getElementById("formresult");
let editRowIndex = -1;

// Submit button click event
submitbtn.onclick = () => {
    if (validateForm()) {
        const genderValue = getGenderValue();
        const selectedHobbies = getSelectedHobbies();

        if (editRowIndex === -1) {
            addRowToTable(email.value, phone.value, citselect.value, genderValue, selectedHobbies);
            saveRecordToLocalStorage(email.value, phone.value, citselect.value, genderValue, selectedHobbies);
        } else {
            updateRowInTable(editRowIndex, email.value, phone.value, citselect.value, genderValue, selectedHobbies);
            editRowIndex = -1;
            submitbtn.textContent = "Submit";
        }

        clearForm();
        updateSerialNumbers();
    }
};

// Clear button click event
clearbtn.onclick = () => {
    clearForm();
    editRowIndex = -1;
};

// Form validation
function validateForm() {
    let error = false;

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (email.value.length === 0) {
        showError(email, emailErrortext, "Email is Required");
        error = true;
    } else if (!emailRegex.test(email.value)) {
        showError(email, emailErrortext, "This Email is Invalid");
        error = true;
    } else {
        clearError(email, emailErrortext);
    }

    // Phone validation
    const phoneRegex = /^(0|91)?[6-9][0-9]{9}$/;
    if (phone.value.length === 0) {
        showError(phone, phoneErrortext, "Phone Number is Required");
        error = true;
    } else if (!phoneRegex.test(phone.value)) {
        showError(phone, phoneErrortext, "This Phone Number is Invalid");
        error = true;
    } else {
        clearError(phone, phoneErrortext);
    }

    // City validation
    if (citselect.value === "") {
        showError(city, cityErrortext, "City is Required");
        error = true;
    } else {
        clearError(citselect, cityErrortext);
    }

    // Gender validation
    let isGenderSelected = false;
    for (let i = 0; i < genders.length; i++) {
        if (genders[i].checked) {
            isGenderSelected = true;
            break;
        }
    }
    if (!isGenderSelected) {
        showError(null, genderErrortext, "Gender is Required");
        error = true;
    } else {
        genderErrortext.textContent = "";
    }

    // Hobbies validation
    let selectedHobbies = getSelectedHobbies(); // Allow multiple hobbies
    if (selectedHobbies.length === 0) {
        showError(null, hobbyErrortext, "At least one Hobby is Required");
        error = true;
    } else {
        hobbyErrortext.textContent = "";
    }

    return !error;
}

// Show error message
function showError(input, errorElement, message) {
    if (input) input.style.border = "1px solid red";
    errorElement.textContent = message;
    errorElement.style.color = "red";
    errorElement.style.fontSize = "12px";
}

// Clear error message
function clearError(input, errorElement) {
    if (input) input.style.border = "";
    errorElement.textContent = "";
}

// Add row to the table
function addRowToTable(email, phone, city, gender, hobbies) {
    let newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td></td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>${city}</td>
        <td>${gender}</td>
        <td>${hobbies.join(", ")}</td>
        <td>
            <button class="btn btn-sm edit-btn" title="Edit"><i class="fa-regular fa-pen-to-square"></i></button>
            <button class="btn btn-sm delete-btn" title="Delete"><i class="fa-regular fa-trash-can"></i></button>
        </td>`;
    resultTable.appendChild(newRow); // Use appendChild to keep the order consistent
    updateSerialNumbers();

    // Attach delete and edit event handlers
    newRow.querySelector(".delete-btn").onclick = () => {
        deleteRow(newRow);
        updateSerialNumbers();
    };
    newRow.querySelector(".edit-btn").onclick = () => editRow(newRow);
}

// Update row in the table
function updateRowInTable(index, email, phone, city, gender, hobbies) {
    let rows = resultTable.getElementsByTagName("tr");
    let row = rows[index];
    row.cells[1].textContent = email;
    row.cells[2].textContent = phone;
    row.cells[3].textContent = city;
    row.cells[4].textContent = gender;
    row.cells[5].textContent = hobbies.join(", "); // Update multiple hobbies

    // Update local storage
    updateLocalStorage(index, email, phone, city, gender, hobbies);
}

// Edit row
function editRow(row) {
    let cells = row.getElementsByTagName("td");
    email.value = cells[1].textContent;
    phone.value = cells[2].textContent;
    citselect.value = cells[3].textContent;

    for (let i = 0; i < genders.length; i++) {
        if (genders[i].value === cells[4].textContent) {
            genders[i].checked = true;
            break;
        }
    }

    let selectedHobbies = cells[5].textContent.split(", "); // Multiple hobbies
    for (let i = 0; i < hobbies.length; i++) {
        hobbies[i].checked = selectedHobbies.includes(hobbies[i].value);
    }

    submitbtn.textContent = "Update";
    editRowIndex = row.rowIndex - 1;
    resetValidationState();
}

// Delete row 
function deleteRow(row) {
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you really want to delete this row?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            const index = Array.from(resultTable.rows).indexOf(row);
            row.parentNode.removeChild(row);

            // Update local storage
            deleteFromLocalStorage(index);
            updateSerialNumbers();

            Swal.fire(
                'Deleted!',
                'The row has been deleted.',
                'success'
            );
        }
    });
}


// Update serial numbers in the table
function updateSerialNumbers() {
    let rows = resultTable.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        rows[i].getElementsByTagName("td")[0].textContent = i + 1;
    }
}

// Get selected gender value
function getGenderValue() {
    for (let i = 0; i < genders.length; i++) {
        if (genders[i].checked) {
            return genders[i].value;
        }
    }
    return "";
}

// Get selected hobbies (multiple)
function getSelectedHobbies() {
    let selectedHobbies = [];
    for (let i = 0; i < hobbies.length; i++) {
        if (hobbies[i].checked) {
            selectedHobbies.push(hobbies[i].value);
        }
    }
    return selectedHobbies;
}

// Clear the form
function clearForm() {
    email.value = "";
    phone.value = "";
    citselect.value = "";
    for (let i = 0; i < genders.length; i++) {
        genders[i].checked = false;
    }
    for (let i = 0; i < hobbies.length; i++) {
        hobbies[i].checked = false;
    }
    submitbtn.textContent = "Submit";
    resetValidationState();
}

// Reset validation state
function resetValidationState() {
    clearError(email, emailErrortext);
    clearError(phone, phoneErrortext);
    clearError(citselect, cityErrortext);
    clearError(city, cityErrortext);
    genderErrortext.textContent = "";
    hobbyErrortext.textContent = "";
}

// Local storage
function saveRecordToLocalStorage(email, phone, city, gender, hobbies) {
    let form_record = JSON.parse(localStorage.getItem("users")) || [];
    const newObj = {
        email: email,
        phone: phone,
        city: city,
        gender: gender,
        hobbies: hobbies // Store multiple hobbies
    };
    form_record.push(newObj);
    localStorage.setItem("users", JSON.stringify(form_record));
}

function updateLocalStorage(index, email, phone, city, gender, hobbies) {
    let form_record = JSON.parse(localStorage.getItem("users")) || [];
    form_record[index] = {
        email: email,
        phone: phone,
        city: city,
        gender: gender,
        hobbies: hobbies // Update multiple 
    };
    localStorage.setItem("users", JSON.stringify(form_record));
}

function deleteFromLocalStorage(index) {
    let form_record = JSON.parse(localStorage.getItem("users")) || [];
    form_record.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(form_record));
}

// Validation functions for each field
email.oninput = () => {
    emailErrortext.textContent = "";
    email.style.border = "";
};
phone.oninput = () => {
    phoneErrortext.textContent = "";
    phone.style.border = "";
};
citselect.oninput = () => {
    cityErrortext.textContent = "";
    city.style.border = "";
};

for (let gender of genders) {
    gender.oninput = () => {
        genderErrortext.textContent = "";
    };
}

for (let hobby of hobbies) {
    hobby.oninput = () => {
        hobbyErrortext.textContent = "";
    };
}

// On load
window.onload = () => {
    let form_record = JSON.parse(localStorage.getItem("users")) || [];
    form_record.forEach((record) => {
        addRowToTable(record.email, record.phone, record.city, record.gender, record.hobbies);
    });
    updateSerialNumbers(); // Ensure serial numbers are updated after loading data
};
