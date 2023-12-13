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