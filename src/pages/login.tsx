import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { onEncrypt } from "../../infrastructure/authentication";
import { UserContext } from "../../infrastructure/context";
import { login } from "../../infrastructure/services/login";
import { isValidEmail } from "../../infrastructure/utils";
import { LoginContent } from "../../modules/login";

export default function Login() {
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");

  const [isEmailError, toggleEmailError] = useState(false);
  const [isPasswordError, togglePasswordError] = useState(false);
  const [isLoginError, toggleLoginError] = useState(false);

  const { updateUserdata } = useContext(UserContext);
  const router = useRouter();

  const validateEmail = (email: string) => {
    toggleEmailError(false);

    if (isValidEmail(email)) return;
    if (email === "") return;

    toggleEmailError(true);
  };

  const onUpdateEmail = (email: string) => {
    updateEmail(email);

    if (isEmailError) {
      validateEmail(email);
    }
  };

  const validatePassword = (password: string) => {
    togglePasswordError(false);

    if (password.length > 3) return;
    if (password === "") return;

    togglePasswordError(true);
  };

  const onUpdatePassword = (password: string) => {
    updatePassword(password);

    if (isPasswordError) {
      validatePassword(password);
    }
  };

  const onLogin = async () => {
    if (isEmailError || isPasswordError) return;
    toggleLoginError(true);

    const encryptedPassword = (await onEncrypt(password)) || "";
    const loginResponse = await login(email, encryptedPassword);

    if (loginResponse.user_id) {
      updateUserdata(loginResponse);
      // setAuthTokenHeader(loginResponse.access_token);
      router.push("/");

      toggleLoginError(false);
    }
  };

  return (
    <LoginContent
      email={email}
      validateEmail={validateEmail}
      onUpdateEmail={onUpdateEmail}
      isEmailError={isEmailError}
      password={password}
      validatePassword={validatePassword}
      onUpdatePassword={onUpdatePassword}
      isPasswordError={isPasswordError}
      onLogin={onLogin}
      isLoginError={isLoginError}
    />
  );
}
