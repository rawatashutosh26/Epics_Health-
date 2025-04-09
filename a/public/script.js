

// Function to handle health document uploads
document.getElementById('healthUploadForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const healthFileInput = document.querySelector('.healthFileInput');
    const healthDocType = document.querySelector('.healthDocType');
    const healthFile = healthFileInput.files[0];

    if (healthFile) {
        const listItem = document.createElement('li');
        listItem.textContent = `${healthDocType.options[healthDocType.selectedIndex].text}: ${healthFile.name}`;
        document.getElementById('healthDocumentList').appendChild(listItem);

        // Clear the file input
        healthFileInput.value = '';
    } else {
        alert('Please select a health document to upload.');
    }
});

// Function to handle adding personal document upload boxes
document.getElementById('addPersonalUpload').addEventListener('click', function() {
    const personalUploadContainer = document.getElementById('personalUploadContainer');
    const newUploadBox = document.createElement('div');
    newUploadBox.classList.add('personal-upload-box');
    newUploadBox.innerHTML = `
        <label for="personalFileInput">Choose a personal document to upload:</label>
        <input type="file" class="personalFileInput" accept=".pdf,.doc,.docx,.jpg,.png" required>
        <label for="personalDocType">Select Document Type:</label>
        <select class="personalDocType">
            <option value="id">Identification (ID)</option>
            <option value="address_proof">Address Proof</option>
            <option value="other">Other</option>
        </select>
    `;
    personalUploadContainer.appendChild(newUploadBox);
});




document.getElementById('submitPersonalDocuments').addEventListener('click', function () {
    const personalFileInputs = document.querySelectorAll('.personalFileInput');
    const personalDocTypes = document.querySelectorAll('.personalDocType');
    const personalDocumentList = document.getElementById('personalDocumentList');

    personalDocumentList.innerHTML = ''; // Clear list

    personalFileInputs.forEach((input, index) => {
        const file = input.files[0];
        const docType = personalDocTypes[index].value;

        if (file) {
            const listItem = document.createElement('li');
            listItem.textContent = `${docType}: ${file.name}`;
            personalDocumentList.appendChild(listItem);

            const formData = new FormData();
            formData.append("file", file);
            formData.append("type", docType);
            formData.append("category", "personal");

            fetch("http://localhost:3000/upload", {
                method: "POST",
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                console.log("Uploaded:", data);
            })
            .catch(err => {
                console.error("Upload failed:", err);
            });

        } else {
            alert("Please select a personal document to upload.");
        }
    });
});


// Function to handle adding health document upload boxes
document.getElementById('addHealthUpload').addEventListener('click', function() {
    const healthUploadContainer = document.getElementById('healthUploadContainer');
    const newUploadBox = document.createElement('div');
    newUploadBox.classList.add('personal-upload-box');
    newUploadBox.innerHTML = `
        <label for="healthFileInput">Choose a health document to upload:</label>
        <input type="file" class="healthFileInput" accept=".pdf,.doc,.docx,.jpg,.png" required>
        <label for="healthDocType">Select Document Type:</label>
        <select class="healthDocType">
            <option value="medical_report">Medical Report</option>
            <option value="prescription">Prescription</option>
            <option value="lab_result">Lab Result</option>
            <option value="insurance_document">Insurance Document</option>
            <option value="other">Other</option>
        </select>
    `;
    healthUploadContainer.appendChild(newUploadBox);
});




document.getElementById('submitHealthDocuments').addEventListener('click', function () {
    const healthFileInputs = document.querySelectorAll('.healthFileInput');
    const healthDocTypes = document.querySelectorAll('.healthDocType');
    const healthDocumentList = document.getElementById('healthDocumentList');

    healthDocumentList.innerHTML = ''; // Clear list

    healthFileInputs.forEach((input, index) => {
        const file = input.files[0];
        const docType = healthDocTypes[index].value;

        if (file) {
            const listItem = document.createElement('li');
            listItem.textContent = `${docType}: ${file.name}`;
            healthDocumentList.appendChild(listItem);

            const formData = new FormData();
            formData.append("file", file);
            formData.append("type", docType);
            formData.append("category", "health");

            fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                console.log("Uploaded:", data);
            })
            .catch(err => {
                console.error("Upload failed:", err);
            });

        } else {
            alert("Please select a health document to upload.");
        }
    });
});

async function uploadDocuments(inputSelector, docTypeSelector, listId) {
    const fileInputs = document.querySelectorAll(inputSelector);
    const docTypes = document.querySelectorAll(docTypeSelector);
    const docList = document.getElementById(listId);

    docList.innerHTML = '';

    for (let i = 0; i < fileInputs.length; i++) {
        const file = fileInputs[i].files[0];
        const docType = docTypes[i].value;

        if (!file) {
            alert("Please select a file to upload.");
            continue;
        }

        const listItem = document.createElement('li');
        listItem.textContent = `${docType}: ${file.name}`;
        docList.appendChild(listItem);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", docType); // optional metadata

        const response = await fetch("http://localhost:5000/upload", {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        if (result.success) {
            console.log("✅ File uploaded:", result.link);
        } else {
            console.error("❌ Upload failed:", result.message);
        }
    }
}

document.getElementById('submitHealthDocuments').addEventListener('click', function () {
    uploadDocuments('.healthFileInput', '.healthDocType', 'healthDocumentList');
});

document.getElementById('submitPersonalDocuments').addEventListener('click', function () {
    uploadDocuments('.personalFileInput', '.personalDocType', 'personalDocumentList');
});

