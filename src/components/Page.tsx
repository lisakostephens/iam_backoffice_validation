import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { setAxiosInterceptor } from "../../infrastructure/authentication";
import { ToastContext, UserContext } from "../../infrastructure/context";
import { Menu } from "./Menu";
import LogoutButton from "./LogoutButton";

export const Page = ({
  title,
  className,
  children,
}: {
  title?: string;
  className?: string;
  children: JSX.Element | JSX.Element[];
}) => {
  const router = useRouter();
  const { userData } = useContext(UserContext);
  const showToast = useContext(ToastContext);

  setAxiosInterceptor(showToast);

  const userDataRef = useRef(userData);
  useEffect(() => {
    userDataRef.current = userData;
  }, [userData]);

  const protectedRoutes = [
    "/",
    "/dashboard",
    "/clients",
    "/clientsx",
    "/services",
    "/resources",
  ];

  useEffect(() => {
    // checkUserLoginStatus();
    // router.events.on('routeChangeComplete', checkUserLoginStatus);
    localStorage.setItem("username", "Lisa");
    sessionStorage.setItem("session_id", "12345678");
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("userData", JSON.stringify(userDataRef.current));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkUserLoginStatus = () => {
    if (
      userDataRef.current &&
      !protectedRoutes.includes(window.location.pathname)
    ) {
      router.push("/");
      return;
    }
    if (
      !userDataRef.current &&
      protectedRoutes.includes(window.location.pathname)
    ) {
      router.push("/login");
      return;
    }
  };

  return (
    <div className={"page " + className && className}>
      <Head>
        <title>{title ? title : "IAM Backoffice"}</title>
      </Head>
      {<LogoutButton />}
      {userData && <Menu />}
      <Menu />
      <div className={userData ? 'custom-container' : ''}>
      <div className={"custom-container"}>{children}</div>
    </div>
    </div>
  );
};
