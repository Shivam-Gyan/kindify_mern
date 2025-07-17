import React from 'react'
import WaveDivider from '../../components/WaveDivider'

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome to Kindify</h1>
            <p className="text-xl mb-8">Share kindness, spread happiness, make a difference.</p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </section>
      <WaveDivider />
    </div>
  )
}

export default Home