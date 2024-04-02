import * as authentication from "./authenticationSlice";

export function authLoginService(email: string, password: string) {
  return async function (dispatch) {
    dispatch(authentication.setErrorStatut(false));
    dispatch(authentication.setLoadingStatut(true));

    const apiURL: string = "http://localhost:3001/api/v1/user/login";

    try {
      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const fetchedAuthToken = await response.json();

        sessionStorage.setItem("ArgentBank", fetchedAuthToken.body.token);
        dispatch(authentication.setAuthStatut(true));
      } else {
        dispatch(authentication.setErrorStatut(true));
      }
    } catch (error: unknown) {
      dispatch(authentication.setErrorStatut(true));
      console.log(error);
    } finally {
      dispatch(authentication.setLoadingStatut(false));
    }
  };
}

export function authLogoutService(dispatch) {
  sessionStorage.removeItem("ArgentBank");
  dispatch(authentication.setAuthStatut(false));
}
