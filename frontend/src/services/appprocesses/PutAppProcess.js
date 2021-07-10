import { useEffect } from "react";
import axios from "axios";

const PostAppProcess = async (app) => {
  const result = await axios.put(app.url, app);
  console.log(result.data.results);
};
export default PostAppProcess;
