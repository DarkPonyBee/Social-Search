import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div>
      Homepage
      <div>
        <Link to="/login">
          <button>SignIn</button>
        </Link>
        <Link to="/signup">
          <button>Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
