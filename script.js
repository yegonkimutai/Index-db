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
    const store = db.createObjectStore('machines', { keyPath: "id" });
    store.createIndex('cars_color', ['color'], { unique: false });
    store.createIndex('color_and_make', ['color', 'make'], { unique: false })
}

request.onsuccess = function() {
    const db = request.result;
    const transaction = db.transaction('machines', 'readwrite');
    const store = transaction.objectStore('machines');
    const colorIndex = store.index('cars_color');
    const makeIndex = store.index('color_and_make');

    store.put({ id: 1, color: "Red", make: "Toyota" });
    store.put({ id: 2, color: "Red", make: "KIA" });
    store.put({ id: 3, color: "Blue", make: "Honda" });
    store.put({ id: 4, color: "Silver", make: "Subaru" });

    const idQuery = store.get(4);
    const colorQuery = colorIndex.getAll(["Red"]);
    const makeQuery = makeIndex.get(["Blue", "Honda"]);

    idQuery.onsuccess = function() {
        console.log('idQuery', idQuery.result);
    }

    colorQuery.onsuccess = function() {
        console.log('colorQuery', colorQuery.result);
    }

    makeQuery.onsuccess = function() {
        console.log('makeQuery', makeQuery.result);
    }
}