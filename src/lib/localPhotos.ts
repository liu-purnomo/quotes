// Uploaded photos live only in this browser's IndexedDB and never reach the server.
// IndexedDB rather than localStorage, whose ~5 MB quota is smaller than one phone photo.

export interface LocalPhoto {
  id: number;
  blob: Blob;
}

const DB_NAME = 'quote-image-editor';
const STORE_NAME = 'photos';
const MAX_PHOTOS = 12;

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function transactionDone(transaction: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}

// Newest first
export async function listLocalPhotos(): Promise<LocalPhoto[]> {
  const db = await openDatabase();

  try {
    const request = db.transaction(STORE_NAME).objectStore(STORE_NAME).getAll();
    const photos = await new Promise<LocalPhoto[]>((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    return photos.reverse();
  } finally {
    db.close();
  }
}

// Keeps the newest MAX_PHOTOS so storage cannot grow without bound
export async function saveLocalPhoto(blob: Blob): Promise<void> {
  const db = await openDatabase();

  try {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.add({ blob });

    const keys = store.getAllKeys();
    keys.onsuccess = () => {
      keys.result.slice(0, -MAX_PHOTOS).forEach((key) => store.delete(key));
    };

    await transactionDone(transaction);
  } finally {
    db.close();
  }
}

export async function deleteLocalPhoto(id: number): Promise<void> {
  const db = await openDatabase();

  try {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    transaction.objectStore(STORE_NAME).delete(id);
    await transactionDone(transaction);
  } finally {
    db.close();
  }
}
