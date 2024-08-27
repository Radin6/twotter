import app from "./app.js"
import {initializeDB} from "./db.js"

const port = 3000;

initializeDB();
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})