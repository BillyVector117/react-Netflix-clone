import { Link, useLocation } from "react-router-dom";
import "./list.css";
//import { Publish } from "@material-ui/icons";
import { useContext, useState } from "react";
import { ListContext } from "../../context/listContext/ListContext";
import { updateList } from "../../context/listContext/ApiCalls";
import Message from "../../components/elements/Message";
import CustomButton from "../../components/elements/CustomButton";
import MultipleSelect from "../../components/elements/MultipleSelect";

export default function List() {
    const { dispatch } = useContext(ListContext);
    const location = useLocation();
    // console.log("useLocation",location)
    const list = location.list
    const [existingData, setExistingData] = useState(list)
    const [showMessage, setShowMessage] = useState(false);
    const handleChange = (event) => {
        setExistingData({ ...existingData, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("LIST UPDATED! ", existingData)
        updateList(existingData, dispatch)
        setShowMessage(true)
        // Clean states
        setTimeout(() => {
            setShowMessage(false)
        }, 3000);
    }

    // console.log('location: LIST', list) // Comes from location (redirection path)
    console.log('Content to send: ', existingData)
    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">List</h1>
                <Link to="/newList">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="productInfoTop">
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
                            <span className="productInfoKey">type:</span>
                            <span className="productInfoValue">{existingData.type}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>List title</label>
                        <input type="text" placeholder={existingData.title} onChange={handleChange} name="title" />
                        <label>Type</label>
                        <input type="text" placeholder={existingData.type} onChange={handleChange} name="type" />
                        <label>Genre</label>
                        <input type="text" placeholder={existingData.genre} onChange={handleChange} name="genre" />
                        <Message severity="error" messageText="The select below is a experimental functionality" />
                        <MultipleSelect setExistingData={setExistingData} existingData={existingData} name="content" />
                    </div>
                    <div className="productFormRight">
                        {showMessage ? (<CustomButton textContent="Wait" color="" disabled="true" className="productButton" onClick={handleSubmit} />)
                            : (<div onClick={handleSubmit} >
                                <CustomButton textContent="Accept" color="primary" className="productButton" />
                            </div>)}
                    </div>
                </form>
            </div>
            {showMessage ? (<Message severity="success" messageText="Successfully updated!" />) : (<> </>)}
        </div>
    );
}
