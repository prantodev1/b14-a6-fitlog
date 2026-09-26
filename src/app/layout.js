import "./globals.css";
import { PlanProvider } from "./planContext/PlanContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "FitLog - Workout Library",
  description:
    "A dark, no-nonsense gym companion: pick a lift, lock it into todays plan.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-100 min-h-screen flex flex-col font-sans antialiased">
        <PlanProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{ style: { background: "#18181b", color: "#fff" } }}
          />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}