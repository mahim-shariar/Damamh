import React from "react";
import Hero from "../../components/Hero";
import ProblemSection from "../../components/ProblemSection";
import SolutionSection from "../../components/SolutionSection";
import Benefits from "../../components/Benefits";
import Testimonials from "../../components/Testimonials";
import FAQ from "../../components/FAQ";

const Home = () => {
  return (
    <div>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <Benefits />
      <Testimonials />
      <FAQ />
    </div>
  );
};

export default Home;
