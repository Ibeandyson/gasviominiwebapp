import { useRouter } from "next/router";
import crypto from "crypto";

//LOCAL STORAGE ENCRYPTION AND DECYPTION keys
let aeskey = "MvYiDO2ePasOLVcN";
let ivKey = "RQBblIzmI3UhH0N9";

const useWithAuth = (WrappedComponent, admin) => {
  return (props) => {
    if (typeof window !== "undefined") {
      const Router = useRouter();
      const currentPage = Router.pathname;
			console.log(currentPage)
			

      if (localStorage.getItem("staff_data")) {
        let data = localStorage.getItem("staff_data");
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
          Router.replace("/");
          return null;
        } else {
          if (admin === true) {
            if (access.role === "admin") {
              return (
                <div>
                  <WrappedComponent {...props} />
                </div>
              );
            } else {
              Router.push("/not_found");
            }
          }else{
						return (
							<div>
								<WrappedComponent {...props} />
							</div>
						);
          }
        }
				
      } else {
        Router.replace("/");
      }
    }
    // If we are on server, return null
    return null;
  };
};

export default useWithAuth;
