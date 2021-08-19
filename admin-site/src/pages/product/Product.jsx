import { Link, useLocation } from "react-router-dom";
import "./product.css";
import { Publish } from "@material-ui/icons";
import { useContext, useState } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { updateMovie } from "../../context/movieContext/ApiCalls";
import storage from "../../firebase";

export default function Product() {
    const { dispatch } = useContext(MovieContext)

    const location = useLocation();
    // console.log("useLocation",location)
    const movie = location.movie
    const [existingData, setExistingData] = useState(movie)
    const [uploadedFiles, setUploadedFiles] = useState(0);
    const handleChange = (event) => {
        let inputName = event.target.name;
        if (inputName === "imagePath" || inputName === "imageTitle" || inputName === "imageSm" || inputName === "trailer" || inputName === "video") {
            return setExistingData({ ...existingData, [event.target.name]: event.target.files[0] })
        } else {
            return setExistingData({ ...existingData, [event.target.name]: event.target.value })
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("NEW MOVVVIE", existingData)
        updateMovie(existingData, dispatch)
        // Clean states
        setUploadedFiles(0)
    }
    const handleUpload = (event) => {
        if (existingData === movie) alert("New data missing")
        // Validate to update Storage
        event.preventDefault();
        if (movie.trailer !== existingData.trailer || movie.video !== existingData.video || movie.imageSm !== existingData.imageSm) {
            const dataToUpdate = [
                { file: existingData.imageSm, label: "imageSm" },
                { file: existingData.trailer, label: "trailer" },
                { file: existingData.video, label: "video" }
            ]
            dataToUpdate.forEach((item) => {
                // For each item set a specific bucket path 
                const filename = new Date().getTime() + item.label + item.file.name
                const uploadItem = storage.ref(`/items/${filename}`).put(item.file)
                uploadItem.on("state_changed",
                    (snapshot) => {
                        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log(percent + "% done");
                    }, (error) => { console.log(error) }, () => {
                        uploadItem.snapshot.ref.getDownloadURL().then((url) => {
                            setExistingData((prev) => { return { ...prev, [item.label]: url } });
                            setUploadedFiles((prev) => prev + 1)
                        })
                    })
            })
        } else {
            handleSubmit(event)
        }
    }

    console.log('location: movie', movie) // Comes from location (redirection path)
    console.log('existing data', existingData)
    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Movie</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={existingData.imageSm} alt="" className="productInfoImg" />
                        <span className="productName">{existingData.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{existingData._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">genre:</span>
                            <span className="productInfoValue">{existingData.genre}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">year:</span>
                            <span className="productInfoValue">{existingData.year}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">limit:</span>
                            <span className="productInfoValue">{existingData.limit}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Movie title</label>
                        <input type="text" placeholder={existingData.title} onChange={handleChange} name="title" />
                        <label>Year</label>
                        <input type="text" placeholder={existingData.year} onChange={handleChange} name="year" />
                        <label>Genre</label>
                        <input type="text" placeholder={existingData.genre} onChange={handleChange} name="genre" />
                        <label>Limit</label>
                        <input type="text" placeholder={existingData.limit} onChange={handleChange} name="limit" />
                        <label>Trailer</label>
                        <input type="file" placeholder={movie.trailer} onChange={handleChange} name="trailer" />
                        <label>Video</label>
                        <input type="file" placeholder={movie.video} onChange={handleChange} name="video" />
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={movie.imageSm} alt="" className="productUploadImg" />
                            <label htmlFor="file">
                                <Publish />
                            </label>
                            <input type="file" id="file" name="imageSm" style={{ display: "none" }} onChange={handleChange} />
                        </div>
                        {uploadedFiles === 3 ? (<button className="productButton" onClick={handleSubmit}>Accept</button>) : (<button className="productButton" onClick={handleUpload}>Update files</button>)}
                    </div>
                </form>
            </div>
        </div>
    );
}
