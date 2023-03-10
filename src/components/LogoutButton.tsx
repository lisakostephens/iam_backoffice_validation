import React from "react";
import Image from "next/image";
import Router from "next/router";

// click on the logout button to logout. Clears local storage, session storage, and
// then redirects to the login page
const LogoutButton = () => {
  const LoggingOut = () => {
    if (confirm("Do you want to log out?")) {
      localStorage.clear();
      sessionStorage.clear();
      Router.push("/login");
    }
  };
  return (
    <div className="header">
      <a className="logout-image" onClick={LoggingOut}>
        <Image
          priority
          src="/assets/icons/shutdown-icon.svg"
          height={40}
          width={40}
          alt="logout"
        />
      </a>
    </div>
  );
};

export default LogoutButton;
