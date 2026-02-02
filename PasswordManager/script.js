let passwords = JSON.parse(localStorage.getItem("passwords")) || [];

function savePassword() {
    let site = document.getElementById("site").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (site === "" || username === "" || password === "") {
        alert("Please fill all fields");
        return;
    }

    passwords.push({ site, username, password });
    localStorage.setItem("passwords", JSON.stringify(passwords));

    displayPasswords();
    clearFields();
}

function displayPasswords() {
    let list = document.getElementById("passwordList");
    list.innerHTML = "";

    passwords.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <div>
                <strong>${item.site}</strong><br>
                ${item.username}<br>
                <span id="pass-${index}">••••••</span>
            </div>
            <div>
                <button onclick="togglePassword(${index})">👁</button>
                <button onclick="deletePassword(${index})">❌</button>
            </div>
        `;
        list.appendChild(li);
    });
}

function togglePassword(index) {
    let span = document.getElementById(`pass-${index}`);
    span.textContent =
        span.textContent === "••••••"
        ? passwords[index].password
        : "••••••";
}

function copyPassword(index) {
    navigator.clipboard.writeText(passwords[index].password);
    alert("Password copied to clipboard!");
}


function deletePassword(index) {
    passwords.splice(index, 1);
    localStorage.setItem("passwords", JSON.stringify(passwords));
    displayPasswords();
}

function clearFields() {
    document.getElementById("site").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

displayPasswords();
