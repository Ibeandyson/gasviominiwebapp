import { useRouter } from "next/router";
import crypto from "crypto";

//LOCAL STORAGE ENCRYPTION AND DECYPTION keys
let aeskey: any = "MvYiDO2ePasOLVcN";
let ivKey: any = "RQBblIzmI3UhH0N9";

const loginWithAuth = (WrappedComponent: any) => {
  return (props: any) => {
    if (typeof window !== "undefined") {
      const Router = useRouter();

      if (localStorage.getItem("staff_data")) {
        let data: any = localStorage.getItem("staff_data");
        const md5Key = crypto
          .createHash("md5")
          .update(aeskey)
          .digest("hex")
          .substr(0, 24);
        const decipher = crypto.createDecipheriv(
          "des-ede3",
          md5Key,
          ivKey,
          aeskey
        );
        let decrypted = decipher.update(data, "base64", "utf8");
        decrypted += decipher.final("utf8");
        const access = JSON.parse(decrypted);

        if (access.token === access.token) {
          Router.back();
          return null;
        } 
      }
      return <WrappedComponent {...props}/>
    }
    // If we are on server, return null
    return null;
  };
};

export default loginWithAuth;
