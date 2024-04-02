import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authLoginService } from "../redux/Auth/authentificationServices";
import * as authentication from "../redux/Auth/authenticationSlice";
import LoadingSpinner from "../components/LoadingSpinner";

function Login() {
  const [emailInput, setEmailInput] = useState<string>(
    localStorage.getItem("ArgentBank_email") || ""
  );
  const [isEmailValid, setEmailValid] = useState<boolean | null>(null);
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [isRememberInput, setRememberInput] = useState<boolean>(
    !!localStorage.getItem("ArgentBank_email")
  );

  const handleEmailInput = (event) => setEmailInput(event.target.value);
  const handlePasswordInput = (event) => setPasswordInput(event.target.value);
  const handleRememberInput = () =>
    setRememberInput((previousState: boolean) => !previousState);

  const handleForm = (event) => {
    event.preventDefault();

    if (isEmailValid && passwordInput !== "") {
      reduxDispatch(authLoginService(emailInput, passwordInput));
    } else {
      reduxDispatch(authentication.setErrorStatut(true));
    }
  };

  const reduxDispatch: AppDispatch = useDispatch();
  const errorSelector: boolean = useSelector(
    (state) => state.authentication.isError
  );
  const loadingSelector: boolean = useSelector(
    (state) => state.authentication.isLoading
  );
  const connectedSelector: boolean = useSelector(
    (state) => state.authentication.isConnected
  );

  const navigate = useNavigate();

  useEffect(() => {
    const checkEmailValid: boolean = /^[\w-.]+@([\w-]+\.)+[\w-]{2,6}$/.test(
      emailInput
    );

    if (emailInput === "") {
      setEmailValid(null);
    } else {
      setEmailValid(checkEmailValid);
    }

    if (connectedSelector) {
      navigate("/profile");
    }
  }, [emailInput, connectedSelector, navigate]);

  return (
    <>
      {loadingSelector ? (
        <LoadingSpinner />
      ) : (
        <main className="bg-dark">
          <section className="sign-in-content">
            <span className="fa fa-user-circle sign-in-content__icon"></span>
            <h2>Sign In</h2>

            <form onSubmit={(event) => handleForm(event)}>
              <div className="input-wrapper">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={emailInput}
                  onChange={(event) => handleEmailInput(event)}
                />
                {!isEmailValid && isEmailValid !== null && (
                  <span className="input-error">
                    Please enter a valid email
                  </span>
                )}
              </div>

              <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={passwordInput}
                  onChange={(event) => handlePasswordInput(event)}
                />
                {errorSelector && (
                  <span className="input-error">
                    Your email and password don't match, please verify them
                  </span>
                )}
              </div>

              <div className="input-remember">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={isRememberInput}
                  onChange={handleRememberInput}
                />
                <label htmlFor="remember-me">Remember me</label>
              </div>

              <button className="sign-in-content__button">Sign In</button>
            </form>
          </section>
        </main>
      )}
    </>
  );
}

export default Login;
