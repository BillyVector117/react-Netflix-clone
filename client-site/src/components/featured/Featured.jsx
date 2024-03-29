import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import Skeleton from "@material-ui/lab/Skeleton";
import axios from "axios";
import { useEffect, useState } from "react";
import "./featured.scss";

export default function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true)
  // Get random content for dashboard using Custom Hook
  /*  const { data, loading, error } = useFetchArray(`https://api-netflix-app.herokuapp.com/movies&series/random?type=${type}`)
   console.log("data: ", data, "error: ", error, "loading: ", loading)
     setContent(data);
   */
  useEffect(() => {
    const getRandomContent = async () => {
      try {
        // Ex: http://localhost:4000/movies&series/random?type=series
        // /movies&series/random?type=${type}
        const res = await axios.get(`https://api-netflix-app.herokuapp.com/movies&series/random?type=${type}`, {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            authtoken:
              "Bearer " + JSON.parse(localStorage.getItem("user")).myToken,
          },
        });
        // console.log('Featured random content', res.data[0])
        setContent(res.data[0]);
        setLoading(false) // SetTimeOut() to test Skeleton
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);
  console.log('loading is: ', loading)

  console.log('Featured random content', content)
  if (loading) return (
    <h1 style={{ height: "80vh", width: "100%", padding: "50px", boxSizing: "border-box" }}>
      <Skeleton variant="rect" width="100%" height="100%" />
    </h1>
  );

  return (
    <>

      <div className="featured">
        {type && (
          <div className="category">
            <span>{type === "movie" ? "Movies" : "Series"}</span>
            <select
              name="genre"
              id="genre"
              onChange={(event) => setGenre(event.target.value)}
            >
              <option value="">Genre</option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="Comedy">Comedy</option>
              <option value="Crime">Crime</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Historical">Historical</option>
              <option value="Horror">Horror</option>
              <option value="Romance">Romance</option>
              <option value="Sci-fi">Sci-fi</option>
              <option value="Thriller">Thriller</option>
              <option value="Western">Western</option>
              <option value="Animation">Animation</option>
              <option value="Drama">Drama</option>
              <option value="Documentary">Documentary</option>
            </select>
          </div>
        )}
        {content && (
          <img src={content.imagePath} alt="" />
        )}
        {/* <img src={content.imagePath} alt="" /> */}
        <div className="info">
          {content && (
            <>
              <img src={content.imageTitle} alt="" />
              <span className="desc">{content.description}</span>
            </>
          )}
          {/* <img src={content.imageTitle} alt="" /> */}
          {/* <span className="desc">{content.description}</span> */}
          <div className="buttons">
            <button className="play">
              <PlayArrow />
              <span>Play</span>
            </button>
            <button className="more">
              <InfoOutlined />
              <span>Info</span>
            </button>
          </div>
        </div>
      </div>


    </>
  );
}
