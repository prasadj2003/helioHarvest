import Navbar from "./Navbar";
import LandingPageContent from "./LandingPageContent";

const Home = () => {
    return (
        <div className="flex flex-row h-screen">
            <div className="w-1/2 h-full bg-gray-300 flex justify-center items-center relative">
                {/* Sun Image */}
                <img
                    className="absolute left-[15%] top-1/4 transform -translate-x-8 -translate-y-8 w-1/4"
                    src="../src/assets/sun.png"
                    alt="sun"
                />
                <h1 className="font-bold text-8xl">helioHarvest</h1>
            </div>
            <div className="w-1/2 bg-lime-500 h-full flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col justify-center items-center px-8 text-center">
                    <LandingPageContent />
                </div>
            </div>
        </div>
    );
};

export default Home;
