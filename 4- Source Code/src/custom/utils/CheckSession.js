import { getLoginCredentialsFromLocalStorage } from "./localStorage/localStorage";

export const checkToken = async (navigate, route) => {
  const credential = await getLoginCredentialsFromLocalStorage();
  return credential.token === "" ? navigate(route, { replace: true }) : true;
};
