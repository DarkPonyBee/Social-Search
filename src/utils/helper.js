export const getAuth = () => {
  const auth = localStorage.getItem("auth");
  return typeof auth === "string" ? JSON.parse(auth) : false;
};

export const setAuth = (dataAuth) => {
  localStorage.setItem("auth", JSON.stringify(dataAuth));
};

export const getParam = (name, search) => {
  if (!name || !search) return "";
  const urlParams = new URLSearchParams(search);
  return urlParams.get(name);
};
