
if (document.getElementById("registrationForm")) {
    document.getElementById("registrationForm").addEventListener("submit", function(event) {
        event.preventDefault();
        let fullName = document.getElementById("fullName").value;
        let email = document.getElementById("email").value;
        let mobile = document.getElementById("mobile").value;
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let userData = { fullName, email, mobile, username, password };
        sessionStorage.setItem(username, JSON.stringify(userData));
        alert("Registration successful!");
        window.location.href = "login.html";
    });
}


if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let userData = JSON.parse(sessionStorage.getItem(username));
        if (!userData) {
            alert("Invalid username. Register first!");
            return;
        }
        if (password !== userData.password) {
            alert("Invalid password!");
            return;
        }
        sessionStorage.setItem("currentUser", username);
        window.location.href = "dashboard.html";
    });
}

if (document.getElementById("userData")) {
    document.addEventListener("DOMContentLoaded", function() {
        let currentUser = sessionStorage.getItem("currentUser");
        let userData = JSON.parse(sessionStorage.getItem(currentUser));
        let tableRow = document.getElementById("userData");

        function displayUserData() {
            let tableData = `
                <td>${userData.fullName}</td>
                <td>${userData.email}</td>
                <td>${userData.mobile}</td>
                <td>${userData.username}</td>
                <td>
                    <button class="removeBtn">Remove</button>
                    <button class="updateBtn">Update</button>
                </td>
            `;
            tableRow.innerHTML = tableData;
            addEventListeners();
        }

        function addEventListeners() {
            let removeBtn = tableRow.querySelector('.removeBtn');
            removeBtn.addEventListener('click', function() {
                sessionStorage.removeItem(currentUser);
                tableRow.remove();
            });

            let updateBtn = tableRow.querySelector('.updateBtn');
            updateBtn.addEventListener('click', function() {
                let updateForm = `
                    <td><input type="text" id="fullName" value="${userData.fullName}"></td>
                    <td><input type="text" id="email" value="${userData.email}"></td>
                    <td><input type="text" id="mobile" value="${userData.mobile}"></td>
                    <td><input type="text" id="username" value="${userData.username}"></td>
                    <td><button id="saveChangesBtn">Save Changes</button></td>
                `;
                tableRow.innerHTML = updateForm;

                let saveChangesBtn = tableRow.querySelector('#saveChangesBtn');
                saveChangesBtn.addEventListener('click', function() {
                    userData.fullName = document.getElementById('fullName').value;
                    userData.email = document.getElementById('email').value;
                    userData.mobile = document.getElementById('mobile').value;
                    userData.username = document.getElementById('username').value;
                    sessionStorage.setItem(currentUser, JSON.stringify(userData));
                    displayUserData();
                });
            });
        }

        displayUserData();
    });
}
function logout() {
    sessionStorage.removeItem("currentUser");
    window.location.href = "index.html";
}
