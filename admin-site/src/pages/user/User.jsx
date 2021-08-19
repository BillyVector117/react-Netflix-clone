import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { updateUser } from "../../context/userContext/apiCalls";
import { UserContext } from "../../context/userContext/UserContext";
import Message from "../../components/elements/Message";
import "./user.css";
import storage from "../../firebase";

export default function User() {
  const location = useLocation() // contains "user" Object
  const user = location.user
  const created_date = new Date(user.createdAt); // Transform mongoDB Date Type to JS Date
  const getTime = (dataToConvert) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = dataToConvert.getFullYear();
    const month = months[dataToConvert.getMonth()];
    const date = dataToConvert.getDate();
    const hour = dataToConvert.getHours();
    const min = dataToConvert.getMinutes();
    const sec = dataToConvert.getSeconds();
    return date + ', ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;    // final date with time, you can use this according your requirement
  }

  // console.log(location)
  const [uploadFile, setUploadFile] = useState(0)
  const [existingData, setExistingData] = useState(user)
  const [showMessage, setShowMessage] = useState(false)
  const [showAlert2, setShowAlert2] = useState(false)
  const { dispatch } = useContext(UserContext)

  const handleChange = (event) => {
    let inputName = event.target.name;
    if (inputName === "imagePath") {
      return setExistingData({ ...existingData, [event.target.name]: event.target.files[0] })
    } else {
      setExistingData({ ...existingData, [event.target.name]: event.target.value })
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    updateUser(existingData, dispatch)
    setShowMessage(true)
    setTimeout(() => {
      setShowMessage(false)
    }, 3000);

  }
  const handleUpload = (item) => {
    const filename = new Date().getTime() + item.label + item.file.name
    const uploadItem = storage.ref(`/userItems/${filename}`).put(item.file)
    uploadItem.on("state_changed",
      (snapshot) => {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(percent + "% done");
        // Stop after receiving one update.
        //unsubscribe();
      }, (error) => { console.log(error) }, () => {
        uploadItem.snapshot.ref.getDownloadURL().then((url) => {
          setExistingData((prev) => { return { ...prev, [item.label]: url } }); // Update upload data Object State
          setUploadFile((prev) => prev + 1) // Update upload file Counter (Wich actives Submit button)
          setShowAlert2(true) // Active "alert 2" for 3 sec.
          setTimeout(() => {
            setShowAlert2(false)
          }, 3000);
        })
      })
  }

  const handleContinue = (event) => {
    event.preventDefault()
    if (existingData.imagePath === user.imagePath) {
      // User did not modify image
      updateUser(existingData, dispatch)
      setShowMessage(true)
      setTimeout(() => {
        setShowMessage(false)
      }, 3000);
      setExistingData(user)
      return
    } else {
      // User modified image
      handleUpload({ file: existingData.imagePath, label: "imagePath" })
    }
  }
  /*  console.log('Locale path:',user)
   console.log('Current input value:',existingData) */
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">User profile</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create User</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={existingData.imagePath}
              alt={existingData.username}
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{existingData.username}</span>
              <span className="userShowUserTitle">{existingData.isAdmin ? "VIP user" : "Standar User"}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{getTime(created_date)} </span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+52 55 55 55 55</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user._id}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">New York | USA</span>
            </div>
          </div>
        </div>
        {/* UPDATE SECTION */}
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={existingData.username}
                  name="username"
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={existingData.email}
                  name="email"
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={existingData.imagePath}
                  alt={existingData.username}
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" name="imagePath" style={{ display: "none" }} onChange={handleChange} />
              </div>
              {uploadFile !== 0 ? (<button className="userUpdateButton" onClick={handleSubmit} >Continue</button>
              ) : (<button className="userUpdateButton" onClick={handleContinue} >Save</button>
              )}
            </div>
          </form>
          {showAlert2 && <Message severity="warning" messageText="Wait while updating file!" />}
          {showMessage && <Message severity="success" messageText="Successfully Updated!" />}
        </div>
      </div>
    </div>
  );
}
