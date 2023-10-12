import { useEffect, useState } from 'react';

function useLocalStorage(key, initialValue) {
  // Get the initial value from localStorage if it exists
  const storedValue = typeof window !== 'undefined' ? localStorage.getItem(key) : initialValue;


  // Create a state variable to hold the current value
  const [value, setValue] = useState(storedValue);

  

  // Save the value to localStorage whenever it changes
  const saveValueToLocalStorage = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, newValue);
  };

  // Clear the value from localStorage
  const clearValueFromLocalStorage = () => {
    setValue(initialValue);
    localStorage.removeItem(key);
  };

  return [value, saveValueToLocalStorage, clearValueFromLocalStorage];
}

export default useLocalStorage;
