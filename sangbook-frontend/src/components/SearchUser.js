import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SearchUser = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Tìm kiếm trên SangBook"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <div className="search-results">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="search-item"
                onClick={() => navigate(`/profile/${user.id}`)}
              >
                <img
                  src={`${API_BASE_URL}/${user.avatar}`}
                  alt=""
                  className="img-avt"
                />
                <span>{user.username}</span>
              </div>
            ))
          ) : (
            <p>Không tìm thấy kết quả</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchUser;
