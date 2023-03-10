export const getPublicKey = async (): Promise<string> => {
  let encryptedKey: string;
  try {
    encryptedKey = await (await fetch(`${window.location.origin}/public.pem`)).text();
    sessionStorage.setItem("pkey", encryptedKey)
    return encryptedKey;
  } catch (e) {
    console.error(e)
    return "error"
  }
}

export const isValidEmail = (email: string) => {
  return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email));
}

export const isValidName = (name: string) => {
  return (/^[a-z_]+$/.test(name));
}

export const isValidEmailUserName = (userName: string) => {
  return (/^[A-Za-z0-9_]+$/.test(userName));
}

export const isValidLabel = (name: string) => {
  if (name.length == 1) {
    return (/^[A-Z]+$/.test(name));
  }

  return (/^[A-Z]+[a-z]+$/.test(name));
}

export const capitalize = (text: string) => {
  if (text.length == 0) {
    return "";
  }
  
  return text?.charAt(0).toUpperCase() + text.slice(1);
}

export const downloadContent = (content: string, fileName = "credentials.json") => {
  let dlAnchorElem = document.createElement('a');
  dlAnchorElem.id = 'downloadAnchorElem';
  dlAnchorElem.style.display = 'none';
  document.body.append(dlAnchorElem);
  dlAnchorElem.setAttribute("href", "data:text/json;charset=utf-8," + content);
  dlAnchorElem.setAttribute("download", fileName);
  dlAnchorElem.click();
  dlAnchorElem.remove();
}