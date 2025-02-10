import {useNavigate} from "react-router"

const Navbar = () => {


    const navigate = useNavigate();
    return (
        <nav className="absolute w-1/2 top-0 right-0">
            <div className="flex justify-between items-center p-4">
                <ul className="flex space-x-4">
                    <li>
                        <a
                            href="#"
                            className="text-black font-semibold hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md"
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="text-black font-semibold hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md"
                        >
                            About
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="text-black font-semibold hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md"
                        >
                            Services
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="text-black font-semibold hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md"
                        >
                            Contact
                        </a>
                    </li>
                </ul>
                <button
                    type="button"
                    onClick={() => navigate("/MapboxExample")}
                    className="text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-4 py-2 dark:bg-black dark:hover:bg-black dark:focus:ring-black"
                >
                    Get Started
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
