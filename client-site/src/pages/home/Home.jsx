import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = ({ type }) => {
  
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState("");
  useEffect(() => {
    // Fetch for random lists array
    const getRandomList = async () => {
      try {
        // Ex: http://localhost:5000/lists/?type=movie&genre=Comedy
        //http://localhost:5000/lists/${type ? "?type=" + type : ""}${genre ? "&?genre=" + genre : ""}
        const res = await axios.get(`https://api-netflix-app.herokuapp.com/lists/${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`, {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            authtoken:
              "Bearer " + JSON.parse(localStorage.getItem("user")).myToken,
          },
        })
        /* console.log("Type: ", type, "Genre: ", genre)
        console.log("Random lists received: ", res.data) */
        setLists(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    getRandomList()
  }, [genre, type]);
   console.log("Type: ", type, "Genre: ", genre)
  console.log("random list received: ", lists)
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists.map((list) => (
        <List key={list._id} list={list} />
      ))}
    </div>
  );
};

export default Home;
