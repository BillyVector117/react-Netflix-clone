import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
//import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext"
import { deleteMovie, getMovies } from "../../context/movieContext/ApiCalls";
export default function ProductList() {
 // const [data, setData] = useState(productRows);
  const { movies, dispatch } = useContext(MovieContext)

  useEffect(() => {
     getMovies(dispatch)
  }, [dispatch])


  const handleDelete = (id) => {
    deleteMovie(id, dispatch)
  };
  console.log("movies admin: ", movies)

  const columns = [
    // "field" property refers to Object name property of each array Object
    { field: "_id", headerName: "ID", width: 120 },
    {
      field: "movie",
      headerName: "Movie",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.imageSm} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "Year", width: 120 },
    { field: "limit", headerName: "Limit", width: 120 },
    { field: "inSeries", headerName: "Series", width: 120 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
          {/* "pathname" receives Redirect URL and optional key&value (In this case sending EACH complete movie)  */}
            <Link to={{pathname:"/product/" + params.row._id, movie: params.row, TEST: "TEST"}}>
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
        rows={movies}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={r => r._id}
      />
    </div>
  );
}
