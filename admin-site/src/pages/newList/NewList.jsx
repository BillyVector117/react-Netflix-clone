import { useContext, useEffect, useState } from "react";
import Message from "../../components/elements/Message";
import { createList } from "../../context/listContext/ApiCalls";
import { ListContext } from "../../context/listContext/ListContext";
import { getMovies } from "../../context/movieContext/ApiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import "./newList.css";

export default function NewList() {
  const { dispatch } = useContext(ListContext)
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext)
  const initialState = {
    title: "",
    type: "",
    genre: "",
    content: [],
  }
  const [data, setData] = useState(initialState)
  const [message, setMessage] = useState(false);
  useEffect(() => {
    getMovies(dispatchMovie)
  }, [dispatchMovie])

  const handleChange = (event) => {

    setData({ ...data, [event.target.name]: event.target.value })
  }
  const handleSelect = (event) => {
    // Catch every selection (which creates an Array with a lot of props) then from each item
    // of that Array return a new Array only saving the value property of each item (id)
    let arraySelection = Array.from(event.target.selectedOptions, (option) => option.value)
    // console.log(arraySelection)
    setData({ ...data, [event.target.name]: arraySelection })
  }
  const handleSubmit = (event) => {
    // Here dispatch the action
    event.preventDefault();
    createList(data, dispatch)
    setMessage(true)
    setTimeout(() => {
      setMessage(false)
    }, 3000);
    // setData(initialState)
  }
  console.log(data)

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New List</h1>
      <form className="addProductForm">
        <div className="form-Left">
          <div className="addProductItem">
            <label>Title</label>
            <input type="text" placeholder="List Name Title" name="title" value={data.title} onChange={handleChange} />
          </div>
          <div className="addProductItem">
            <label>Genre</label>
            <input type="text" placeholder="genre" name="genre" value={data.genre} onChange={handleChange} />
          </div>
          <div className="addProductItem">
            <label>Type</label>
            <select name="type" onChange={handleChange}>
              <option>Type</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
        </div>
        <div className="formRight">
          <div className="addProductItem">
            <label>Content</label>
            <select multiple name="content" value={data.content} onChange={handleSelect} style={{ height: "280px" }}>
              {
                movies.map((movie) => (
                  <option key={movie._id} value={movie._id}>{movie.title}</option>
                ))
              }
            </select>
          </div>
        </div>
        <button className="addProductButton" onClick={handleSubmit}>Create</button>
      </form>
      {message ? (<Message severity="success" messageText="Successfully created!" />
      ) : (<></>)}
    </div>
  );
}
