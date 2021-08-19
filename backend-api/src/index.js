import app from "./app";
import "./database"
app.get("PORT")

app.listen(app.get("PORT"))
console.log("Server is running on PORT: ", app.get('PORT'))