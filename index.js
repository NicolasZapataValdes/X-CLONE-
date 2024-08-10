import { app } from "./app";
import { PORT } from "./Utils";

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
