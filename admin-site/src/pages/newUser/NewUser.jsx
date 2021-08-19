import { useContext, useState } from "react";
import Message from "../../components/elements/Message";
import { uploadUserWithAuth } from "../../context/userContext/apiCalls";
import { UserContext } from "../../context/userContext/UserContext";
import "./newUser.css";

export default function NewUser() {
  const initialState = {
    username: "john",
    email: "john12@gmail.com",
    password: "password",
    gender: "other",
    isAdmin: false
  }
  const { dispatch } = useContext(UserContext)
  const [data, setData] = useState(initialState);
  const [showMessage, setShowMessage] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault()
    uploadUserWithAuth(data, dispatch)
    setShowMessage(true)
    setTimeout(() => {
      setShowMessage(false)
    }, 3000);
    setData(initialState)
    // console.log(data)
  }
  const handleChange = (event) => {
    if (event.target.name === "isAdmin") {
      if (event.target.value === "true") {
        return setData({ ...data, isAdmin: true })
      } else {
        return setData({ ...data, isAdmin: false })
      }
    }
    setData({ ...data, [event.target.name]: event.target.value })
  }
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" name="username" placeholder={data.username} onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" name="email" placeholder={data.email} onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" name="password" placeholder={data.password} onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" onChange={handleChange} />
            <label htmlFor="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" onChange={handleChange} />
            <label htmlFor="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" onChange={handleChange} />
            <label htmlFor="other">Other</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Admin permissions</label>
          <select className="newUserSelect" name="isAdmin" id="active" value={data.isAdmin} onChange={handleChange} >
            <option>Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button className="newUserButton" onClick={handleSubmit}>Create</button>
      </form>
      {showMessage && <Message severity="success" messageText="Successfully created!" />}
    </div>
  );
}
