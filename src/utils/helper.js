export const getAuth = () => {
  const auth = localStorage.getItem("auth");
  return typeof auth === "string" ? JSON.parse(auth) : {};
};

export const setAuth = (dataAuth) => {
  localStorage.setItem("auth", JSON.stringify(dataAuth));
};

export const getParam = (name) => {
  if (!name) return "";
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
};
