import { createContext, useContext, useEffect, useState } from "react";

const TimeContext = createContext();

const storageFallback = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value;
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

const getStorage = () => {
  try {
    sessionStorage.setItem("test", "test");
    sessionStorage.removeItem("test");
    return sessionStorage;
  } catch (error) {
    console.log(error);
    return storageFallback;
  }
};

const storage = getStorage();

export const TimeProvider = ({ children }) => {
  const startTime = storage.getItem("startTime");
  const endTime = storage.getItem("endTime");
  const paus = storage.getItem("paus");

  const [timeState, setTimeState] = useState({
    startTime,
    endTime,
    paus,
  });

  const setTime = (startTime, endTime, paus) => {
    const start = storage.setItem("startTime", startTime);
    const end = storage.setItem("endTime", endTime);
    const hasPaus = storage.setItem("paus", paus);

    setTimeState({
      startTime: start,
      endTime: end,
      paus: hasPaus,
    });
  };

  const clear = () => {
    storage.removeItem("startTime");
    storage.removeItem("endTime");
    storage.removeItem("paus");
    setTimeState({
      startTime: null,
      endTime: null,
      paus: false,
    });
  };

  useEffect(() => {
    const start = storage.getItem("startTime");
    const end = storage.getItem("endTime");
    const hasPaus = storage.getItem("paus");

    setTimeState({
      startTime: start,
      endTime: end,
      paus: hasPaus,
    });
  }, []);

  return (
    <TimeContext.Provider value={{ timeState, setTime, clear }}>
      {children}
    </TimeContext.Provider>
  );
};

export const useTime = () => useContext(TimeContext);
