import { ISidebarFilter } from "@/store/products/dummyjson.com_slice";
import { useState } from "react";

export const useSessionStorage = (keyName: string, defaultValue: []) => {
  const [storageValue, setStorageValue] = useState<ISidebarFilter>(() => {
    try {
      const value = sessionStorage.getItem(keyName);

      if (value) {
        return JSON.parse(value);
      } else {
        sessionStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue: ISidebarFilter) => {
    try {
      sessionStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {}
    setStorageValue(newValue);
  };

  return [storageValue, setValue] as const;
};
