// script.js

let socket;
let lobbyId = "";

// Join a lobby
function joinLobby() 
{
    lobbyId = document.getElementById('lobbyId').value;
    if (!lobbyId) {
        alert('Please enter a valid lobby ID.');
        return;
    }

    // Connect to Socket.IO
    socket = io(/*'http://localhost:3000'*/); // Connect to the backend

    socket.emit('join-lobby', lobbyId);   // Listen for new images from the backend

    document.getElementById('image-upload').style.display = 'block';
}

// Function to display an image
function displayImage(imageUrl) 
{
    const img = document.createElement('img');
    img.src = imageUrl;
    document.getElementById('imageContainer').appendChild(img);
}

// Upload an image
function uploadImage() 
{
    const fileInput = document.getElementById('imageFile');
    const file = fileInput.files[0];

    if (!file || !lobbyId) {
        alert('Please select an image and join a lobby first.');
        return;
    }

    const formData = new FormData();
    formData.append('image', file);

    // Make a POST request to the backend API to upload the image
    fetch(`/api/upload/${lobbyId}`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Image uploaded:', data);
    })
    .catch(error => {
        console.error('Error uploading image:', error);
    });
}


//DRAWING STUFF

let canvas = document.getElementById('drawingCanvas');
let ctx = canvas.getContext('2d');
let drawing = false;
let lastX = 0;
let lastY = 0;
let color = 'black';

// Fill the canvas with a white background when initialized
function initializeCanvas() 
{
    ctx.fillStyle = 'white'; // Set the fill color to white
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with white
}

initializeCanvas();

// Get canvas position relative to the page
function getCanvasPosition(e) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

// Start drawing
function startDrawing(x, y) {
    drawing = true;
    lastX = x;
    lastY = y;
}

// Stop drawing
function stopDrawing() {
    drawing = false;
}

function changeColor(r,g,b)
{
    color = "rgb("+r+","+g+","+b+")";
}

// Draw on canvas
function draw(x, y) {
    if (!drawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.closePath();
    lastX = x;
    lastY = y;
}

// Handle mouse events
canvas.addEventListener('mousedown', (e) => {
    let pos = getCanvasPosition(e);
    startDrawing(pos.x, pos.y);

});

canvas.addEventListener('mousemove', (e) => {
    let pos = getCanvasPosition(e);
    draw(pos.x, pos.y)
});

canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Handle touch events
canvas.addEventListener('touchstart', (e) => {
    let touch = e.touches[0];
    let pos = getCanvasPosition(touch);
    startDrawing(pos.x+8, pos.y-2);
    e.preventDefault(); // Prevent scrolling while drawing
});
canvas.addEventListener('touchmove', (e) => {
    let touch = e.touches[0];
    let pos = getCanvasPosition(touch);
    draw(pos.x+8, pos.y-2);
    e.preventDefault(); // Prevent scrolling while drawing
});
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchcancel', stopDrawing);

// Draw on the canvas
canvas.addEventListener('mousemove', (event) => {
    if (!drawing) return;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.stroke();
});

// Initialize canvas on page load
window.onload = initializeCanvas;

// Clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveDrawing() 
{
    // Convert the canvas drawing to a PNG data URL
    const drawingDataUrl = canvas.toDataURL('image/png');

    // Convert the data URL to a Blob so it can be sent as a file
    const blob = dataURLtoBlob(drawingDataUrl);

    if (!lobbyId) {
        alert('Please join a lobby first.');
        return;
    }

    const formData = new FormData();
    formData.append('image', blob, 'drawing.png'); // "drawing.png" is the file name sent to the server

    // Send the drawing to the backend
    fetch(`/api/upload/${lobbyId}`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Drawing uploaded:', data);
        clearCanvas();
        initializeCanvas();
    })
    .catch(error => {
        console.error('Error uploading drawing:', error);
    });
}

// Utility function to convert a data URL to a Blob
function dataURLtoBlob(dataUrl) 
{
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

