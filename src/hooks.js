import { useEffect, useRef, useState } from 'react';

export const usePrevious = value => {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export const usePersistedState = (storageKey, fallbackValue) => {
  const [value, setValue] = useState(() => {
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
  });

  useEffect(() => {
    if (value) {
      window.localStorage.setItem(storageKey, JSON.stringify(value));
    } else {
      window.localStorage.removeItem(storageKey);
    }
  }, [storageKey, value]);

  return [
    value,
    setValue,
    () => {
      setValue(fallbackValue);
    },
  ];
};

// same thing as usePersistedState but saves in the URL instead
export const usePersistedUrlState = (storageKey, fallbackValue) => {
    const [value, setValue] = useState(() => {
      // https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      // get the value of "some_key" in eg "https://example.com/?some_key=some_value"
      const storedValue = params[storageKey]; 
  
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
    });
  
    useEffect(() => {
      // https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter
      if (value && value != []) {
        const codedValue = encodeURIComponent(JSON.stringify(value));
        var searchParams = new URLSearchParams(window.location.search);
        searchParams.set(storageKey, JSON.stringify(value));
        var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
        window.history.pushState(null, '', newRelativePathQuery);
      } else {
        // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/delete
        var searchParams = new URLSearchParams(window.location.search);
        searchParams.delete(storageKey);
        var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
        window.history.pushState(null, '', newRelativePathQuery);
      }
    }, [storageKey, value]);
  
    return [
      value,
      setValue,
      () => {
        setValue(fallbackValue);
      },
    ];
  };