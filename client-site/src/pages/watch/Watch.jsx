import { ArrowBackOutlined } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import "./watch.scss";

export default function Watch() {
  const location = useLocation();
  // const movie = location.movie;
  console.log(location)
  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video className="video" autoPlay progress='true' controls src="https://www.w3schools.com/tags/movie.ogg" />
    </div>
  );
}
