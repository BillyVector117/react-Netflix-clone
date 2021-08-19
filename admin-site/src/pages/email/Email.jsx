import React, { useState } from 'react'
import { send } from 'emailjs-com';

import "./email.css"
import Message from '../../components/elements/Message';
const Email = () => {
    const [showAlert, setShowAlert] = useState(false)
    const [toSend, setToSend] = useState({ message: "", from_name: "", to_name: "", reply_to: '', })
    const handleSubmit = (event) => {
        event.preventDefault();
        send(
            'service_o8rk5ds',
            'template_4j5v88h',
            toSend,
            'user_EeQ7rcz029iq8lHC3Mcmc'
        )
            .then((response) => {
                setShowAlert(true)
                setTimeout(() => {
                    setShowAlert(false)
                }, 3000);
                console.log('SUCCESS!', response.status, response.text);
            })
            .catch((err) => {
                console.log('FAILED...', err);
            });
    };
    const handleChange = (event) => {
        setToSend({ ...toSend, [event.target.name]: event.target.value })
    }
    return (

        <div className="container">
            <div className="feedback">
                <form onSubmit={handleSubmit} className="feedbackForm">
                    <input
                        type='text'
                        className="feedbackInput"
                        name='from_name'
                        placeholder='from name'
                        value={toSend.from_name}
                        onChange={handleChange}
                    />
                    <input
                        type='text'
                        className="feedbackInput"
                        name='to_name'
                        placeholder='to name'
                        value={toSend.to_name}
                        onChange={handleChange}
                    />
                    <input
                        type='text'
                        className="feedbackInput"
                        name='reply_to'
                        placeholder='Your email'
                        value={toSend.reply_to}
                        onChange={handleChange}
                    />
                    <textarea type="text" placeholder="Write your feedback" value={toSend.message} name="message" autoCapitalize="characters" cols="100" rows="15" className="feedbackInput" onChange={handleChange} />
                    <button className="feedbackButton"> Send </button>
                    <hr />
                    {showAlert && <Message severity="success" messageText="Feedback sent!" />}
                </form>
            </div>
        </div>

    )
}

export default Email
