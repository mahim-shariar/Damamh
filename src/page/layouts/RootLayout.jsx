import { Outlet, Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GTMPageViewTracker from "../../components/GTMPageViewTracker";

const RootLayout = () => {
  return (
    <div className="app">
      <GTMPageViewTracker />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
