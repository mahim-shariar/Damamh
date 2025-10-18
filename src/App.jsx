// import Benefits from "./components/Benefits";
// import FAQ from "./components/FAQ";
// import Footer from "./components/Footer";
// import Header from "./components/Header";
// import Hero from "./components/Hero";
// import ProblemSection from "./components/ProblemSection";
// import SolutionSection from "./components/SolutionSection";
// import Testimonials from "./components/Testimonials";

// function App() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 font-bangla">
//       <Header />
//
//       <Footer />
//     </div>
//   );
// }

// export default App;
import { RouterProvider } from "react-router-dom";
import router from "./router";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
