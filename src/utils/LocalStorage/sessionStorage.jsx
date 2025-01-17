// Utility to get the current timestamp
const now = () => (new Date()).getTime();

/**
 * Retrieve data from sessionStorage
 * @param {string} key - The key to retrieve.
 * @returns {any|null} - Returns the stored value or null if not found or expired.
 */
export const getFromSessionStorage = (key) => {
    let entry = window.sessionStorage.getItem(key);

    // If entry does not exist or is explicitly set to "undefined", return null
    if (!entry || entry === "undefined") {
        return null;
    }

    // Parse the stored JSON entry
    let entry_data;
    try {
        entry_data = JSON.parse(entry);
    } catch (error) {
        console.error('Error parsing JSON from sessionStorage:', error);
        return null;
    }

    // Extract the expiration details
    const { now, ttl, value } = entry_data;

    // Check if ttl and expiry have been provided and handle expiration logic
    if (ttl && now + ttl < Date.now()) {
        // If expired, remove the entry from sessionStorage and return null
        window.sessionStorage.removeItem(key);
        return null;
    }

    // Return the stored value from the entry
    return value;
};

/**
 * Store data in sessionStorage with an optional time-to-live (ttl).
 * @param {string} key - The key to store the value under.
 * @param {any} value - The value to store.
 * @param {number} [ttl] - Time to live in milliseconds, default is 1 hour.
 */
export const setSessionStorage = (key, value, ttl) => {
    window.sessionStorage.setItem(key, JSON.stringify({
        ttl: ttl || 60 * 60 * 1000, // Default to 1 hour if ttl is not provided
        now: now(),
        value: value
    }));
}

/**
 * Remove an item from sessionStorage.
 * @param {string} key - The key of the item to remove.
 */
export const removeSessionItem = (key) => {
    window.sessionStorage.removeItem(key);
}

/**
 * Clear tracking data from sessionStorage.
 * You can modify this function for any specific keys you want to clear.
 */
export const clearSessionTrackingData = () => {
    setSessionStorage('utm_source', null);
    setSessionStorage('utm_campaign', null);
}
