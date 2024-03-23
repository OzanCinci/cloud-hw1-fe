// HELPER METHODS FOR ACCOUNT SPECIFIC LOCALSTORAGE

export const readFromLocalStorage = (keyToCheck) => {
    const value = localStorage.getItem(keyToCheck);
    return value !== null ? JSON.parse(value) : null;
};

export const writeToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };