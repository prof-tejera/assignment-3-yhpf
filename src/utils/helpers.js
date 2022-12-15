// Add helpers here. This is usually code that is just JS and not React code. Example: write a function that
// calculates number of minutes when passed in seconds. Things of this nature that you don't want to copy/paste
// everywhere.

const writeUrlState = (key, value) => {
    var searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, value);
    var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
    window.history.pushState(null, '', newRelativePathQuery);
    return searchParams;
}

// https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter
const saveStateToUrl = (timerList, setUrlParams) => {
    const searchParams = writeUrlState('timers', JSON.stringify(timerList))
    setUrlParams(searchParams.toString());
    return searchParams.toString();
}

// from prof Nico's usePersistedState in hooks.js
const loadFromLocalStorage = (storageKey, fallbackValue) => {
    const storedValue = window.localStorage.getItem(storageKey);

    if (storedValue === null || !storedValue) {
      console.log('returning fallback', fallbackValue);
      return fallbackValue;
    }

    try {
      return JSON.parse(storedValue);
    } catch (e) {
      console.log('Error parsing stored value', e);
      return null;
    }
}

export { saveStateToUrl, loadFromLocalStorage };
