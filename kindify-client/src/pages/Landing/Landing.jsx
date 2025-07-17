import React from 'react';
import Header from '../../components/Auth/Header';
import Hero from '../../components/LandingPage/Hero';
import About from '../../components/LandingPage/About';
import Features from '../../components/LandingPage/Causes';
import HowItWorks from '../../components/LandingPage/HowItWorks';
import Testimonials from '../../components/LandingPage/Testimonials';
import FAQ from '../../components/LandingPage/FAQ';
import Footer from '../../components/LandingPage/Footer';

const Landing = () => {
  return (
    <div className="bg-white text-gray-900">
      <Header />
      <Hero />
      <About />
      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Landing;
