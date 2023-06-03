import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import "./Featured.scss";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config";
import { Link } from "react-router-dom";

const Featured = ({ type, setGenre }) => {
  const [content, setContent] = useState({});
  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axiosInstance.get(`movies/random?type=${type}`, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>Genre</option>
            <option value="Adventure">Adventure</option>
            <option value="Comedy">Comedy</option>
            <option value="Crime">Crime</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Historical">Historical</option>
            <option value="Horror">Horror</option>
            <option value="Romance">Romance</option>
            <option value="Sci-fi">Sci-fi</option>
            <option value="Thriller">Thriller</option>
            <option value="Action">Action</option>
            <option value="Animation">Animation</option>
            <option value="Documentary">Documentary</option>
          </select>
        </div>
      )}

      <img src={content.img} alt="background-img" />
      <div className="info">
        {/* <img src={content.imgTitle} alt="" /> */}
        <h3 style={{ fontSize: "50px" }}>{content.title}</h3>
        {/* <span>
          <h3 style={{ color: "green", marginRight: "15px" }}>8.2 ratings</h3>
          <h3>{content.year}</h3>
        </span> */}
        <span className="desc">{content.desc}</span>
        <div className="buttons">
          <button className="play">
            <Link className="link" to="/watch" state={{ movie: content }}>
              <PlayArrow />
              <span>Play</span>
            </Link>
          </button>

          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
