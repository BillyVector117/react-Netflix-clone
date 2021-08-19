import "./movieList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
//import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ListContext } from "../../context/listContext/ListContext"
import { deleteList, getLists } from "../../context/listContext/ApiCalls";

export default function MovieList() {
  // const [data, setData] = useState(productRows);
  const { lists, dispatch } = useContext(ListContext)
  lists.forEach((list) => {
    list.contentLength = list.content.length;
    return list
  })
  useEffect(() => {
    getLists(dispatch)
  }, [dispatch])

  const handleDelete = (id) => {
    deleteList(id, dispatch)
  };
  console.log("lists admin: ", lists)
  const columns = [
    // "field" property refers to Object name property of each array Object
    { field: "_id", headerName: "ID", width: 200 },
    { field: "title", headerName: "title", width: 220 },
    { field: "genre", headerName: "genre", width: 150 },
    { field: "type", headerName: "type", width: 150 },
    { field: 'contentLength', headerName: "Content Length", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {/* "pathname" receives Redirect URL and optional key&value (In this case sending EACH complete movie)  */}
            <Link to={{ pathname: "/lists/" + params.row._id, list: params.row, TEST: "TEST" }}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={lists}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={r => r._id}
      />
    </div>
  );
}
