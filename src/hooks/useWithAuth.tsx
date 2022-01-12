import { useRouter } from "next/router";
import crypto from "crypto";

//LOCAL STORAGE ENCRYPTION AND DECYPTION keys
let aeskey: any = "MvYiDO2ePasOLVcN";
let ivKey: any  = "RQBblIzmI3UhH0N9";

const useWithAuth = (WrappedComponent: any, admin: any) => {
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

        if (access.token === null || undefined) {
          Router.replace("/login");
          return null;
        } else {
          if (admin === true) {
            if (access.role === "admin") {
              return <WrappedComponent {...props} />;
            } else {
              Router.push("/not_found");
            }
          } else {
            return <WrappedComponent {...props} />;
          }
        }
      } else {
        Router.replace("/login");
      }
    }
    // If we are on server, return null
    return null;
  };
};

export default useWithAuth;
