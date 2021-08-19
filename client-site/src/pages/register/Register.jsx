import { useContext, useRef } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { register } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import Message from "../../elements/Message";
import "./register.scss";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  //const [dataToSend, setDataToSend] = useState({ username: "", email: "", password: "" })
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const { dispatch } = useContext(AuthContext)
  const history = useHistory();
  const emailRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
    //setDataToSend({ ...dataToSend, [email]: email })
  };

  const handleFinish = async (event) => {
    event.preventDefault();
    try {
      register({ email, username, password }, dispatch)
      setShowSuccessAlert(true)
      setTimeout(() => {
        setShowSuccessAlert(false)
        history.push("/login");
      }, 3000);
    } catch (err) {
      console.log(err)
    }
  };

  console.log(email, username, password)
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <button className="loginButton" onClick={() => history.push("/login")} >Sign In</button>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input type="username" placeholder="username" name="username" onChange={(event) => setUsername(event.target.value)} />
            <input type="password" placeholder="password" name="password" onChange={(event) => setPassword(event.target.value)} />
            <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
      </div>
      {showSuccessAlert && <Message severity="success" messageText="Your account has been created!" />}
    </div>
  );
}
