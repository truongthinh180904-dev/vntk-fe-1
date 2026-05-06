import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { ToastContainer } from "react-toastify";
// import PromoModal from "./components/modals/PromoModal";
import GoogleAnalytics from "./components/metaseo/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/next"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <meta name="google-site-verification" content="wLx_y4DKecqB7m5sTVQXzt4Cn1i94ThT9YkO_pYU6iE" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="preconnect" href="https://ik.imagekit.io" />
      </head>
      <body suppressHydrationWarning>
        <GoogleAnalytics />
        <ClientLayout>{children}</ClientLayout>
        {/* <PromoModal /> */}
        {/* ✅ Toast container */}
        <Analytics />
        <ToastContainer
          position="top-center" // hoặc "center-center" nếu custom CSS
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
          className="Toastify__toast-container--center-center"
        />
      </body>
    </html>
  );
}
