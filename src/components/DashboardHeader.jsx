// DashboardHeader.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, User, LogOut } from "lucide-react";

const DashboardHeader = ({ onSearch, searchQuery, setSearchQuery }) => {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    // Rimuovi il token di autenticazione
    localStorage.removeItem("authToken");
    // Reindirizza alla home page
    navigate("/");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="container-fluid px-4 py-3 bg-dashboard   border-bottom ">
      <div className="d-flex justify-content-between align-items-center">
        <Link className="text-decoration-none fs-2 text-dark" to="/">
          ScattiFestosi
        </Link>
        <div className="d-flex align-items-center ">
          <div className="position-relative me-3 ">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Cerca album o foto..."
                className="form-control ps-4"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <span
                className="position-absolute"
                style={{
                  left: "5px",
                  top: "49%",
                  transform: "translateY(-50%)",
                }}
              >
                <Search className="text-secondary" size={18} />
              </span>
            </form>
          </div>
          <div className="position-relative">
            <div
              className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center cursor-pointer"
              style={{ width: "40px", height: "40px", cursor: "pointer" }}
              onClick={toggleDropdown}
            >
              <User className="text-primary" size={20} />
            </div>

            {showDropdown && (
              <div
                className="position-absolute end-0 mt-2 py-2 bg-white rounded shadow-sm"
                style={{ width: "150px", zIndex: 1000 }}
              >
                <button
                  className="dropdown-item d-flex align-items-center px-3 py-2"
                  onClick={handleLogout}
                >
                  <LogOut size={16} className="me-2" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
