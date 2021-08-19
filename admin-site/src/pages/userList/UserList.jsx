import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { deleteUser, getUsers } from "../../context/userContext/apiCalls";
import { UserContext } from "../../context/userContext/UserContext";
import Message from "../../components/elements/Message";

export default function UserList() {
  const { users, dispatch } = useContext(UserContext);
  const [showAlert, setShowAlert] = useState(false)
  useEffect(() => {
    getUsers(dispatch)
  }, [dispatch])
  const handleDelete = (dataId) => {
    deleteUser(dataId, dispatch);
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
    }, 3000);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "username",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.imagePath} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "isAdmin", // Is admin?
      headerName: "Admin",
      width: 120,
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {/* "pathname" receives Redirect URL and optional key&value (In this case sending EACH complete movie)  */}
            <Link to={{ pathname: "/user/" + params.row._id, user: params.row, TEST: "TEST" }}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];
  console.log("users found: ", users)
  return (
    <div className="userList">
      {showAlert && <Message severity="success" messageText="User has been deleted!" />}
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={r => r._id}
      />

    </div>
  );
}
