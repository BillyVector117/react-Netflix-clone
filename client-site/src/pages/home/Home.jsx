import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import "../../components/list/list.scss";
import List from "../../components/list/List";
import { useState } from "react";
import useFetch from "../../customHooks/useFetch";
import "../../components/listItem/listItem.scss";
import SkeletonHome from "../../components/skeletons/SkeletonHome";

const Home = ({ type }) => {
  const [genre, setGenre] = useState("");
  // Fetch Lists data using Custom Hook
  // Ex: http://localhost:5000/lists/?type=movie&genre=Comedy
  // http://localhost:5000/lists/${type ? "?type=" + type : ""}${genre ? "&?genre=" + genre : ""}
  const { data, loading, error } = useFetch(`https://api-netflix-app.herokuapp.com/lists/${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`)
  // console.log("data: ", data, "error: ", error, "loading: ", loading)
  if (loading) return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      <SkeletonHome />
    </div>
  );

  if (error) console.log(error);
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {data && (data.map((list) => (
        <List key={list._id} list={list} />
      )))}
    </div>
  );
};

export default Home;
