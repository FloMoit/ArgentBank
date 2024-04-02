import * as userInfos from "./userInfosSlice";

function getOrUpdateUserInfos(firstName?: string, lastName?: string) {
  return function (dispatch, getState) {
    const loadingStatus: boolean = getState().userInfos.isLoading;

    if (!loadingStatus) {
      dispatch(userInfos.setErrorStatut(false));
      dispatch(userInfos.setLoadingStatut(true));

      const apiURL: string = "http://localhost:3001/api/v1/user/profile";
      const authToken: string | null = sessionStorage.getItem("ArgentBank");

      if (authToken) {
        try {
          if (firstName && lastName) {
            updateUserInfos(apiURL, authToken, firstName, lastName, dispatch);
          } else {
            getUserInfos(apiURL, authToken, dispatch);
          }
        } catch (error: unknown) {
          dispatch(userInfos.setErrorStatut(true));
          console.log(error);
        } finally {
          dispatch(userInfos.setLoadingStatut(false));
        }
      }
    }
    return;
  };
}

export default getOrUpdateUserInfos;

async function getUserInfos(apiURL: string, authToken: string, dispatch) {
  const response = await fetch(apiURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (response.status === 200) {
    const data = await response.json();
    dispatch(userInfos.setData(data.body));
  } else {
    dispatch(userInfos.setErrorStatut(true));
  }
}

async function updateUserInfos(
  apiURL: string,
  authToken: string,
  firstName: string,
  lastName: string,
  dispatch
) {
  const response = await fetch(apiURL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({ firstName, lastName }),
  });

  if (response.status === 200) {
    dispatch(userInfos.editUserName({ firstName, lastName }));
  } else {
    dispatch(userInfos.setErrorStatut(true));
  }
}
