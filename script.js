function addTextData() {
  const textData = document.getElementById('textData').value;
  if (textData) {
    displayUploadedItem('Text', textData);
    document.getElementById('textData').value = '';
  }
}

function uploadFile(inputId) {
  const fileInput = document.getElementById(inputId);
  const files = fileInput.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    displayUploadedItem(file.type, file.name, URL.createObjectURL(file));
  }
  fileInput.value = '';  // Clear the input
}

function displayUploadedItem(type, name, url = '') {
  const uploadedItems = document.getElementById('uploadedItems');
  const itemDiv = document.createElement('div');
  itemDiv.className = 'uploadedItem';
  itemDiv.innerHTML = `
    <p>${type}: ${name}</p>
    ${url ? `<a href="${url}" download>Download</a>` : ''}
    <button onclick="removeItem(this)">Remove</button>
  `;
  uploadedItems.appendChild(itemDiv);
}

function removeItem(button) {
  const itemDiv = button.parentElement;
  itemDiv.remove();
}

function generateLink() {
  // Logic to generate short link and handle backend integration
  // Placeholder: Simulate link generation
  document.getElementById('linkContainer').innerText = 'Short link: https://example.com/xyz123';
}
