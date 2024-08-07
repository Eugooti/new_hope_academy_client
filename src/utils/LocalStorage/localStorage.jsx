
const now = () => (new Date()).getTime();

export const getFromLocalStorage = (key) => {
    let entry = window.localStorage.getItem(key);

    // If entry does not exist or is explicitly set to "undefined", return null
    if (!entry || entry === "undefined") {
        return null;
    }

    // Parse the stored JSON entry
    let entry_data;
    try {
        entry_data = JSON.parse(entry);
    } catch (error) {
        console.error('Error parsing JSON from localStorage:', error);
        return null;
    }

    // Extract the expiration details
    const { now, ttl, value } = entry_data;

    // Check if ttl and expiry have been provided and handle expiration logic
    if (ttl && now + ttl < Date.now()) {
        // If expired, remove the entry from localStorage and return null
        window.localStorage.removeItem(key);
        return null;
    }

    // Return the stored value from the entry
    return value;
};

// export const getUserLocalStorage = (key) => {
//     let entry = window.localStorage.getItem(key);
//     if (!entry || entry === undefined || entry === "undefined") {
//         return null;
//     }
//     let entry_data = JSON.parse(entry);
//     let expiry = entry_data.now + entry_data.ttl;
//
//     if (entry_data.ttl && expiry < now()) {
//         window.localStorage.removeItem(key);
//         window.location.href='/'
//
//         return null;
//     }
//     return entry_data.value;
// }
//will keep item for 1 hours when ttl is not provided
export const setLocalStorage = (key, value, ttl) => {
    window.localStorage.setItem(key, JSON.stringify({
        ttl: ttl || 60 * 60 * 1000,
        now: now(),
        value: value
    }));
}
export const removeItem = (key) => {
    window.localStorage.removeItem(key);
}

// export const setTrackingData = (data) => {
//
//     let utm_source = getFromLocalStorage('utm_source')
//
//     let utm_campaign = getFromLocalStorage('utm_campaign')
//
//     if (utm_source !== null) {
//         data.utm_source = utm_source
//     }
//
//     if (utm_campaign !== null) {
//         data.utm_campaign = utm_campaign
//     }
//
//     return data
// }

export const clearTrackingData = () => {
    setLocalStorage('utm_source', null)
    setLocalStorage('utm_campaign', null)
}
