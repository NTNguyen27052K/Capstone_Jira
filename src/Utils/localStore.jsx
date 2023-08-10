export const setLocal = (name, data) => {
  const dataJs = JSON.stringify(data);
  localStorage.setItem(name, dataJs);
};

export const getDataLocal = (name) => {
  const value = localStorage.getItem(name);

  //   JSON.parse(value) ? JSON.parse(value) : {};
  if (JSON.parse(value)) {
    return JSON.parse(value);
  } else {
    return null;
  }
};
