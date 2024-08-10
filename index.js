import {app} from "./app.js";
import { PORT } from "./Utils/index.js";

app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
