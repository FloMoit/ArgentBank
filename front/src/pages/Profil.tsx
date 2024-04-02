import { useEffect, useState } from "react";
import AccountOverview from "../components/AccountOverview";
import { Accounts } from "../data/accounts";
import { useDispatch, useSelector } from "react-redux";
import getOrUpdateUserInfos from "../redux/UserInfos/getOrUpdateUserInfosService";
import LoadingSpinner from "../components/LoadingSpinner";
import EditUserNameForm from "../components/EditUserNameForm";

function Profil() {
  const [isEditMode, setEditMode] = useState<boolean>(false);

  const changeEditMode = () => setEditMode((previousState) => !previousState);

  const reduxDispatch: AppDispatch = useDispatch();
  const firstNameSelector: string = useSelector(
    (state) => state.userInfos.data.firstName
  );
  const lastNameSelector: string = useSelector(
    (state) => state.userInfos.data.lastName
  );
  const errorSelector: boolean = useSelector(
    (state) => state.userInfos.isError
  );
  const loadingSelector: boolean = useSelector(
    (state) => state.userInfos.isLoading
  );

  useEffect(() => {
    reduxDispatch(getOrUpdateUserInfos());
  }, [reduxDispatch]);

  if (errorSelector) {
    return (
      <main>
        <p className="error-msg">
          Due to an error, your data could not be loaded.
        </p>
        <p className="error-msg">Please try again later.</p>
      </main>
    );
  }

  return (
    <>
      {loadingSelector ? (
        <LoadingSpinner />
      ) : (
        <main className="bg-dark">
          {isEditMode ? (
            <EditUserNameForm changeEditMode={changeEditMode} />
          ) : (
            <div className="profile-header">
              <h2>
                Welcome back
                <br />
                {`${firstNameSelector} ${lastNameSelector}!`}
              </h2>
              <button
                className="profile-header__edit-button"
                onClick={changeEditMode}>
                Edit Name
              </button>
            </div>
          )}

          <h2 className="sr-only">Accounts</h2>

          {Accounts.map((account) => (
            <AccountOverview
              key={account.id}
              accountTitle={account.accountTitle}
              amount={account.amount}
              amountDescription={account.amountDescription}
            />
          ))}
        </main>
      )}
    </>
  );
}

export default Profil;
