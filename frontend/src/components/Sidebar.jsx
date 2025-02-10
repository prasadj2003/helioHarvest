import { useState } from "react";
import { useNavigate } from "react-router";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="relative flex">
      {/* Button for toggling sidebar */}
      <button
        onClick={toggleSidebar}
        className={`p-2 fixed top-4 left-4 z-50 rounded-md ${
          isCollapsed ? "bg-gray-800 text-white" : "bg-lime-500 text-black"
        }`}
      >
        {isCollapsed ? (
          // Hamburger icon when sidebar is closed
        //   <svg
        //     xmlns="http://www.w3.org/2000/svg"
        //     className="h-6 w-6"
        //     fill="none"
        //     viewBox="0 0 24 24"
        //     stroke="currentColor"
        //   >
        //     <path
        //       strokeLinecap="round"
        //       strokeLinejoin="round"
        //       strokeWidth={2}
        //       d="M4 6h16M4 12h16M4 18h16"
        //     />
        //   </svg>
        "Menu"
        ) : (
          // Close text when sidebar is open
          "Close"
        )}
      </button>

      {/* Sidebar */}
      <aside
        id="logo-sidebar"
        className={`${
          isCollapsed ? "-translate-x-full" : "translate-x-0"
        } fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-lime-500`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <img
            onClick={() => navigate("/")}
            src="../src/assets/helioHarvest-removebg-preview.png"
            className="h-48 w-auto cursor-pointer"
            alt="helioHarvest Logo"
          />
          <ul className="space-y-2 font-medium">
            {/* List items */}
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </a>
            </li>
            <li>
  <a
    href="#"
    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
  >
    <svg
      className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M21 8.83V21H3V8.83a3.001 3.001 0 0 1-.285-5.774 3 3 0 0 1 5.57 0h6.43a3 3 0 0 1 5.57 0A3.001 3.001 0 0 1 21 8.83ZM7 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM5 8h14v11H5V8Z" />
    </svg>
    <span className="ms-3">Contact Us</span>
  </a>
</li>

<li>
  <a
    href="#"
    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
  >
    <svg
      className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M10 3.25a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM8.43 8.47l2 2.5 2-2.5.94.77-2 2.5 2 2.5-.94.77-2-2.5-2 2.5-.94-.77 2-2.5-2-2.5.94-.77ZM2.75 2h14.5a.75.75 0 0 1 .75.75v14.5a.75.75 0 0 1-.75.75H2.75A.75.75 0 0 1 2 17.25V2.75A.75.75 0 0 1 2.75 2ZM3.5 3.5v13h13v-13h-13Z" />
    </svg>
    <span className="ms-3">Products</span>
  </a>
</li>

<li>
  <a
    href="#"
    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
  >
    <svg
      className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 0a12 12 0 1 1 0 24A12 12 0 0 1 12 0Zm0 3a9 9 0 1 0 0 18A9 9 0 0 0 12 3Zm0 2a7 7 0 1 1 0 14A7 7 0 0 1 12 5Zm-1 5v2h4v2h-4v4H9v-4H5v-2h4V9h2Z" />
    </svg>
    <span className="ms-3">Future Scope</span>
  </a>
</li>

          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
