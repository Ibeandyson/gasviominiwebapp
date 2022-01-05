import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastProvider } from "react-toast-notifications";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <div>
        <Component {...pageProps} />
      </div>
    </ToastProvider>
  );
}

export default MyApp;
