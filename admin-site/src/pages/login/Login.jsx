import React, { useContext, useState } from 'react'
import Message from '../../components/elements/Message'
import { login, register } from '../../context/authContext/apiCalls'
import { AuthContext } from '../../context/authContext/AuthContext'
import "./login.css"
const Login = () => {
    const initialData = { username: "", email: "", password: "", password2: "" }
    const [inputData, setInputData] = useState(initialData)
    const [secretInput, setSecretInput] = useState("")
    const [isNew, setIsNew] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    const [showErrorAlert1, setShowErrorAlert1] = useState(false)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const { fetching, dispatch } = useContext(AuthContext);

    const handleChange = (event) => {
        setInputData({ ...inputData, [event.target.name]: event.target.value })
    }
    const handleSubmitLogin = (event) => {
        event.preventDefault()
        login(inputData, dispatch)
    }
    const handleSubmitRegister = (event) => {
        event.preventDefault()
        if (inputData.password !== inputData.password2) {
            setShowErrorAlert(true)
            setTimeout(() => {
                setShowErrorAlert(false)
            }, 3000);
            return
        } else if (secretInput !== "secret") {
            setShowErrorAlert1(true)
            setTimeout(() => {
                setShowErrorAlert1(false)
            }, 3000);
            return
        } else {
            setInputData({ ...inputData, isAdmin: true })
            register(inputData, dispatch)
            setShowSuccessAlert(true)
            setTimeout(() => {
                setShowSuccessAlert(false)
            }, 3000);
            setIsNew(false)
            //setInputData()
        }

    }
    console.log(inputData)
    console.log("secret key", secretInput)
    return (
        <>

            <h2 style={{ display: "flex", justifyContent: "center" }}>Login Section</h2>
            <div className="login">
                {
                    isNew ?
                        (<form onSubmit={handleSubmitRegister} className="loginForm">
                            <label htmlFor="">Username</label>
                            <input type="username" placeholder="Jhon" name="username" className="loginInput" onChange={handleChange} />
                            <label htmlFor="">E-mail</label>
                            <input type="email" placeholder="Jhon@gmail.com" name="email" className="loginInput" onChange={handleChange} />
                            <label htmlFor="">password</label>
                            <input type="password" placeholder="****" name="password" className="loginInput" onChange={handleChange} />
                            <label htmlFor="">Repeat password</label>
                            <input type="password" placeholder="Repeat password" name="password2" className="loginInput" onChange={handleChange} />
                            <label htmlFor="">Secret Key</label>
                            <input type="password" placeholder="*SECRET KEY*" name="secretKey" className="loginInput" onChange={(event) => setSecretInput(event.target.value)} value={secretInput} />
                            <button className="loginButton" disabled={fetching}> Signup </button>
                            <span className="spanWords">Already have an account? - <p className="clickHere" onClick={() => setIsNew(false)}>Click here -</p> </span>
                            {showErrorAlert && <Message severity="warning" messageText="Password does not match, try again" />}
                            {showErrorAlert1 && <Message severity="error" messageText="Invalid secret Key" />}


                        </form>) :
                        (
                            <form onSubmit={handleSubmitLogin} className="loginForm">
                                <input type="email" placeholder="email" name="email" className="loginInput" onChange={handleChange} value={inputData.email} />
                                <input type="password" placeholder="password" name="password" className="loginInput" onChange={handleChange} value={inputData.password} />
                                <button className="loginButton" disabled={fetching}> Accept </button>
                                <span className="spanWords">Don't have an account? - <p className="clickHere" onClick={() => setIsNew(true)}>Click here -</p> </span>
                                {showSuccessAlert && <Message severity="success" messageText="User registered! Now try Login" />}

                            </form>
                        )
                }

            </div>
        </>
    )
}

export default Login
