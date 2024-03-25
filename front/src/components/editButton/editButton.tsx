import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEditProfile } from "../../redux/reducers/profileSlice";
import InputForm from "../inputForm/inputForm";
import Button from "../button/button";

function EditButton() {
  const token = useSelector((state) => state.userAuth.token);
  const profile = useSelector((state) => state.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [newUserName, setNewUserName] = useState(profile.userName);

  const dispatch = useDispatch();

  const editUserName = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ firstName: newUserName }),
        }
      );
      if (!response) {
        throw new Error("Échec de la mise à jour du nom d'utilisateur");
      }
      dispatch(setEditProfile(newUserName));
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <InputForm
            label="Username "
            id="username"
            type="text"
            autoComplete="username"
            onChange={(e) => setNewUserName(e.target.value)}
            value={newUserName}
          />
          <br />
          <Button
            name={"Save"}
            className="edit-button"
            onClick={editUserName}></Button>
        </div>
      ) : (
        <Button
          name={"Edit User name"}
          className="edit-button"
          onClick={() => setIsEditing(true)}></Button>
      )}
    </div>
  );
}
export default EditButton;
