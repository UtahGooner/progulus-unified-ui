
export const store_historyLimit = 'progulus/history-limit';

export const setStore = (key:string, value:any) => {
    if (window.localStorage) {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
}

export const getStore = (key:string):any => {
    if (window.localStorage) {
        const value = window.localStorage.getItem(key);
        if (value === null) {
            return value;
        }
        try {
            return JSON.parse(value);
        } catch(err) {
            return null;
        }
    }
}
