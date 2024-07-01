export enum LocalStorageKeys {
  USER_INFO = "USER_INFO",
  THEME = "THEME",
  LOGIN_INFO = "LOGIN_INFO",
  LANG = "LANG",
}

export enum SessionStorageKeys {
  SOME_KEY = "SOME_KEY",
}

export const storage = {
  write: (key: LocalStorageKeys, data: any) => {
    localStorage[key] = JSON.stringify(data);
  },
  delete: (key: LocalStorageKeys) => {
    localStorage.removeItem(key);
  },
  clear: () => {
    localStorage.clear();
  },
  read: (key: LocalStorageKeys, ifDoesntExist?: any) => {
    try {
      return JSON.parse(localStorage[key]);
    } catch (error) {
      if (ifDoesntExist) {
        localStorage[key] = JSON.stringify(ifDoesntExist);
        return ifDoesntExist;
      }
      return null;
    }
  },
  sessionStorage: {
    write: (key: SessionStorageKeys, data: any) => {
      sessionStorage[key] = JSON.stringify(data);
    },
    read: (key: SessionStorageKeys) => {
      return JSON.parse(sessionStorage[key]);
    },
  },
};
