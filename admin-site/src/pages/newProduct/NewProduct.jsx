import { useContext, useState } from "react";
import Message from "../../components/elements/Message";
import { createMovie } from "../../context/movieContext/ApiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import storage from "../../firebase";
import "./newProduct.css";

export default function NewProduct() {
  const { dispatch } = useContext(MovieContext)
  const initialState = {
    imagePath: "",
    imageTitle: "",
    imageSm: "",
    title: "",
    description: "",
    year: "",
    genre: "",
    duration: "",
    limit: 0,
    inSeries: false,

  }
  const [data, setData] = useState(initialState)
  const [uploaded, setUploaded] = useState(0)
  // Message states (2)
  const [uploadComplete, setUploadComplete] = useState(false);
  const [successUpload, setSuccessUpload] = useState(false);

  const handleChange = (event) => {
    let inputName = event.target.name;
    if (inputName === "imagePath" || inputName === "imageTitle" || inputName === "imageSm" || inputName === "trailer" || inputName === "video") {
      return setData({ ...data, [event.target.name]: event.target.files[0] })
    } else {
      return setData({ ...data, [event.target.name]: event.target.value })
    }
  }
  const upload = (items) => {
    // console.log("ITEMS TO UPLOAD:", items)
    items.forEach((item) => {
      // For each item set a specific bucket path 
      const filename = new Date().getTime() + item.label + item.file.name
      const uploadItem = storage.ref(`/items/${filename}`).put(item.file)
      uploadItem.on("state_changed",
        (snapshot) => {
          const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(percent + "% done");
          // Stop after receiving one update.
          //unsubscribe();
        }, (error) => { console.log(error) }, () => {
          uploadItem.snapshot.ref.getDownloadURL().then((url) => {
            setData((prev) => { return { ...prev, [item.label]: url } });
            setUploaded((prev) => prev + 1)
          })
        })
    })
    setUploadComplete(false)
  }
  const handleUpload = (event) => {
    event.preventDefault();
    upload([
      { file: data.imagePath, label: "imagePath" },
      { file: data.imageTitle, label: "imageTitle" },
      { file: data.imageSm, label: "imageSm" },
      { file: data.trailer, label: "trailer" },
      { file: data.video, label: "video" }
    ])
    setUploadComplete(true)
    setTimeout(() => {
      setUploadComplete(false)
    }, 3000);
  }
  const handleSubmit = (event) => {
    // Here dispatch the action
    event.preventDefault();
    createMovie(data, dispatch)
    setSuccessUpload(true)
    setTimeout(() => {
      setSuccessUpload(false)
    }, 3000);
    setData(initialState)
    setUploaded(0)

    // console.log("successfully created!")
  }
  console.log(data)
  // console.log("uploaded files: ", uploaded)
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="imagePath" name="imagePath" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Title Image</label>
          <input type="file" id="imageTitle" name="imageTitle" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Tumbnail Image</label>
          <input type="file" id="imageSm" name="imageSm" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" placeholder="Movie name" name="title" value={data.title} onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" placeholder="description" name="description" value={data.description} onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input type="text" placeholder="Year" name="year" value={data.year} onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" placeholder="Genre" name="genre" value={data.genre} onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input type="text" placeholder="Duration" name="duration" value={data.duration} onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input type="text" placeholder="Limit" name="limit" value={data.limit} onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>In Series?</label>
          <select id="inSeries" name="inSeries" value={data.inSeries} onChange={handleChange} >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input type="file" name="trailer" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input type="file" name="video" onChange={handleChange} />
        </div>

        {uploaded === 5 ? (<button className="addProductButton" onClick={handleSubmit}>Create</button>) : (<button className="addProductButton" onClick={handleUpload}>Upload</button>)}

      </form>
      {successUpload && (<Message severity="success" messageText="Successfully uploaded!" />)}
      {uploadComplete && (<Message severity="warning" messageText="Uploading files" />)}
    </div>
  );
}
