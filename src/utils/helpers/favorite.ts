const loadFromLocalStorage = (key: string) => {
    if (typeof window !== 'undefined') {
        try {
            const serializedData = localStorage.getItem(key);
            return serializedData ? JSON.parse(serializedData) : [];
        } catch (error) {
            console.error('Error loading data from localStorage:', error);
            return [];
        }
    }
};

const saveToLocalStorage = (key: string, data: Pokemon[]) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving data to localStorage:', error);
    }
};


export {
    loadFromLocalStorage,
    saveToLocalStorage
}