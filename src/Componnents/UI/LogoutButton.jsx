import { FaSignOutAlt } from "react-icons/fa";

const LogoutButton = ({ onLogout }) => {
  return (
    <button
      onClick={() => onLogout()}
      className="logout-btn flex items-center justify-between gap-4 px-6 py-2 bg-white text-[#777] font-medium text-[1.6rem] border-none rounded-md cursor-pointer shadow-md hover:bg-[#777] hover:text-[#f3f3f3] hover:shadow-lg"
    >
      <span>Logout </span>
      <span>
        <FaSignOutAlt />
      </span>
    </button>
  );
};

export default LogoutButton;
