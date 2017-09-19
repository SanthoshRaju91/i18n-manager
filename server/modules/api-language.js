import FileDB from "../utils/FileDB";

const configInstance = new FileDB("config.json");
const store = configInstance.getData().store;

export const addNewLanguage = data => {
  if (store === "DB") {
  } else if (store === "FILE") {
  }
};
export const addNewKey = data => {
  if (store === "DB") {
  } else if (store === "FILE") {
  }
};
export const updateKeysValue = data => {
  if (store === "DB") {
  } else if (store === "FILE") {
  }
};
