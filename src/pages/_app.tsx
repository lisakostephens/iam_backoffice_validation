import "../../styles/globals.scss";
import type { AppProps } from "next/app";
import { ToastContext, UserContext } from "../../infrastructure/context";
import { useEffect, useRef, useState } from "react";
import { Page } from "../components/Page";
import { UserData } from "../../infrastructure/interfaces/providers/user";
import { Toast } from "primereact/toast";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "mighty-modal/lib/styles/main.scss";
import { ModalWrapper } from "mighty-modal";

function MyApp({ Component, pageProps }: AppProps) {
  const [userData, updateUserdata] = useState<UserData | null>(null);

  const toast = useRef<any>();
  const showToast = (
    severity: "success" | "info" | "warn" | "error",
    title: string,
    detail: string
  ) => {
    toast.current.show({
      severity: severity,
      summary: title,
      detail: detail,
      life: 3000,
    });
  };

  useEffect(() => {
    updateUserdata(
      JSON.parse(sessionStorage.getItem("userData") as string) || null
    );
    sessionStorage.removeItem("userData");
  }, []);

  return (
    <UserContext.Provider value={{ userData, updateUserdata }}>
      <ToastContext.Provider value={showToast}>
        <ModalWrapper>
          <Page title="IAM Backoffice">
            <Toast ref={toast} />
            <Component {...pageProps} />
          </Page>
        </ModalWrapper>
      </ToastContext.Provider>
    </UserContext.Provider>
  );
}

export default MyApp;
