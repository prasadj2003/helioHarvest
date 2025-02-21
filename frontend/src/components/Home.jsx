// import Navbar from "./Navbar";
// import LandingPageContent from "./LandingPageContent";

// const Home = () => {
//     return (
//         <div className="flex flex-row h-screen">
//             <div className="w-1/2 h-full bg-gray-300 flex justify-center items-center relative">
//                 {/* Sun Image */}
//                 <img
//                     className="absolute left-[15%] top-1/4 transform -translate-x-8 -translate-y-8 w-1/4"
//                     src="../src/assets/sun.png"
//                     alt="sun"
//                 />
//                 <h1 className="font-bold text-8xl">helioHarvest</h1>
//             </div>
//             <div className="w-1/2 bg-lime-500 h-full flex flex-col">
//                 <Navbar />
//                 <div className="flex-1 flex flex-col justify-center items-center px-8 text-center">
//                     <LandingPageContent />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Home;
//*********************************v2code**************************** */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Zap, PiggyBank, Leaf, MapPin, FileText, BarChart } from "lucide-react";
import { motion } from "framer-motion";
import TpMapbox from "./MapboxExample"; // Ensure this exists
import satview from "../assets/satview.jpg";

function Home() {
  const navigate = useNavigate();
  const [showSolarEstimate, setShowSolarEstimate] = useState(false);

  const handleGetStarted = () => {
    navigate("/mapboxExample"); // Redirect to mapbox page
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <div className="flex items-center">
            <Sun className="w-8 h-8 text-yellow-500 mr-2" />
            <span className="text-2xl font-bold text-blue-600">helioHarvest</span>
          </div>
          <nav className="ml-auto">
            <button className="px-4 py-2 text-gray-700 hover:text-blue-600">About</button>
            <button className="px-4 py-2 text-gray-700 hover:text-blue-600">Contact Us</button>
            <button className="px-4 py-2 text-gray-700 hover:text-blue-600">Products</button>
            <button className="px-4 py-2 text-gray-700 hover:text-blue-600" onClick={() => navigate("/FutureScope")}>Future Scope</button>
          </nav>
        </div>
      </header>

      {showSolarEstimate ? (
        <TpMapbox />
      ) : (
        <>
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Discover Your <span className="text-yellow-500">Solar</span> Potential Instantly
              </motion.h1>
              <motion.p
                className="text-xl mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                A step towards Solar Energy to power our homes . No technical knowledge required!
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg transition duration-300"
                  onClick={handleGetStarted}
                >
                  Get Your Free Solar Estimate
                </button>
              </motion.div>
            </div>
            <div className="md:w-1/2">
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                <img src={satview} alt="Satellite view of rooftops" className="rounded-lg shadow-2xl w-full" />
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <section className="bg-blue-50 py-16 md:py-24">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Our Solar  Potential Calculator?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <FeatureCard icon={<Sun className="w-12 h-12 text-yellow-500" />} title="Instant Report" description="No waiting, get results in seconds." />
                <FeatureCard icon={<Zap className="w-12 h-12 text-blue-500" />} title="Data-Driven Accuracy" description="Uses satellite & weather data." />
                <FeatureCard icon={<PiggyBank className="w-12 h-12 text-green-500" />} title="Save on Bills" description="Personalized savings estimate." />
                <FeatureCard icon={<Leaf className="w-12 h-12 text-green-600" />} title="Eco-Friendly" description="Encouraging renewable energy adoption." />
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StepCard icon={<MapPin className="w-12 h-12 text-blue-500" />} title="Enter Your Location" description="Provide basic inputs about your home or business." />
                <StepCard icon={<FileText className="w-12 h-12 text-green-500" />} title="Instant Solar Report" description="Get an accurate estimate instantly." />
                <StepCard icon={<BarChart className="w-12 h-12 text-purple-500" />} title="Compare & Plan" description="See how much you can save!" />
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-16 md:py-24 text-center bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Explore Your Solar Potential?</h2>
              <p className="text-xl mb-8">It's free, fast, and could save you thousands.</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg transition duration-300" onClick={handleGetStarted}>
                Get Started
              </button>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-100 py-8">
            <div className="container mx-auto px-4 text-center">
              <p>&copy; 2025 helioHarvest. All rights reserved.</p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div className="bg-white p-6 rounded-lg shadow-md" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

function StepCard({ icon, title, description }) {
  return (
    <motion.div className="bg-white p-6 rounded-lg shadow-md text-center" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

export default Home;