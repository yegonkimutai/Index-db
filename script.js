const indexDB = 
window.indexedDB ||
window.mozIndexedDB ||
window.webkitindexedDB ||
window.msindexedDB ||
window.shimindexedDB;

const request = indexDB.open('CarsDatabase', 1);

request.onerror = function(event) {
    console.log('An error occured in indexDB');
    console.log(event)
}

request.onupgradeneeded = function() {
    const db = request.result;
    const store = db.createObjectStore('machines', { keyPath: "id"});
    store.createIndex('cars_color', ['color'], { unique: false });
    store.createIndex('color_and_make', ['color', 'make'], { unique: false })
}