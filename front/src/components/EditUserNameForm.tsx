import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import getOrUpdateUserInfos from "../redux/UserInfos/getOrUpdateUserInfosService";

type Props = { changeEditMode: () => void };

function EditUserNameForm({ changeEditMode }: Props) {
  const reduxDispatch = useDispatch();
  const firstNameSelector: string = useSelector(
    (state) => state.userInfos.data.firstName
  );
  const lastNameSelector: string = useSelector(
    (state) => state.userInfos.data.lastName
  );

  const submitForm = () => {
    if (firstNameInput !== "" && lastNameInput !== "") {
      setInputsValid(false);
      reduxDispatch(getOrUpdateUserInfos(firstNameInput, lastNameInput));
      changeEditMode();
    } else {
      setInputsValid(true);
    }
  };

  const [firstNameInput, setFirstNameInput] =
    useState<string>(firstNameSelector);
  const [lastNameInput, setLastNameInput] = useState<string>(lastNameSelector);
  const [isInputsValid, setInputsValid] = useState<boolean>(false);

  const handleFirstNameInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFirstNameInput(event.target.value);

  const handleLastNameInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setLastNameInput(event.target.value);

  return (
    <div className="profile-header">
      <h2>Welcome back</h2>

      <div className="edit-user-form">
        <div className="edit-user-form__first-name">
          <label className="sr-only" htmlFor="first-name">
            First name
          </label>
          <input
            type="text"
            id="first-name"
            value={firstNameInput}
            onChange={handleFirstNameInput}
          />
        </div>

        <div className="edit-user-form__last-name">
          <label className="sr-only" htmlFor="last-name">
            Last name
          </label>
          <input
            type="text"
            id="last-name"
            value={lastNameInput}
            onChange={handleLastNameInput}
          />
        </div>

        <button className="submit-btn" onClick={submitForm}>
          Save
        </button>
        <button className="cancel-btn" onClick={changeEditMode}>
          Cancel
        </button>
      </div>

      {isInputsValid && (
        <>
          <p className="inputs-error-msg">Your inputs cannot be empty!</p>
          <p className="inputs-error-msg">Please verify them</p>
        </>
      )}
    </div>
  );
}

export default EditUserNameForm;
