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
  const endTime = storage.getItem("endTime");
  const paus = storage.getItem("paus");
  const minutes = storage.getItem("minutes");
  const [timeState, setTimeState] = useState({
    endTime,
    paus,
    minutes,
  });

  const setTime = (endTime, paus, minutes) => {
    // const start = storage.setItem("startTime", startTime);
    const end = storage.setItem("endTime", endTime);
    const hasPaus = storage.setItem("paus", paus);
    const setMinutes = storage.setItem("minutes", minutes);
    console.log(minutes);
    setTimeState({
      endTime: endTime,
      paus: paus,
      minutes: minutes,
    });
  };

  const clear = () => {
    storage.removeItem("endTime");
    storage.removeItem("paus");
    storage.removeItem("minutes");
    setTimeState({
      endTime: null,
      paus: false,
      minutes: null,
    });
  };

  useEffect(() => {
    const end = storage.getItem("endTime");
    const hasPaus = storage.getItem("paus");
    const minutes = storage.getItem("minutes");
    setTimeState({
      endTime: end,
      paus: hasPaus,
      minutes: minutes,
    });
  }, []);

  return (
    <TimeContext.Provider value={{ timeState, setTime, clear }}>
      {children}
    </TimeContext.Provider>
  );
};

export const useTime = () => useContext(TimeContext);
