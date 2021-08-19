import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import notFound from "../../assets/not_found.png"
export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        //  const res = await axios.get("/movies&series" + item, {
          // Ex: http://localhost:5000/movie&series/6112ccf0c78d14579c39582b
          // http://localhost:5000/movie&series/${item}
        const res = await axios.get(`https://api-netflix-app.herokuapp.com/movie&series/${item}`, {
          headers: {
            authtoken:
              "Bearer " + JSON.parse(localStorage.getItem("user")).myToken,
          },
        });
        // console.log("res.data", res.data)
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);
  /* console.log("item recibido", item)
   console.log(" SINGLE ITEM FOUND: ", movie) */
  return (
    <Link to={{ pathname: "/watch", movie: movie }}>
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie ? movie.imageSm : notFound} alt="" />
        {isHovered && (
          <>
            <video src="https://www.w3schools.com/tags/movie.ogg" autoPlay={true} loop />
            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownOutlined className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>{movie ? movie.duration : "00:00"}</span>
                <span className="limit">+{movie ? movie.limit : "0"}</span>
                <span>{movie ? movie.year : "0000"}</span>
              </div>
              <div className="desc">{movie ? movie.description : "No results for description :/"}</div>
              <div className="genre">{movie ? movie.genre : "nothing found here :/"}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
