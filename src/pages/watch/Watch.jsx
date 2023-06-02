import { ArrowBackOutlined } from "@material-ui/icons";
import "./Watch.scss";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Watch = () => {
  const location = useLocation();

  const movie = location.state.movie;
  console.log(movie);
  // useEffect(() => {
  console.log(location);
  // }, [location]);
  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video className="video" autoPlay progress controls src={movie.video} />
    </div>
  );
};

export default Watch;
