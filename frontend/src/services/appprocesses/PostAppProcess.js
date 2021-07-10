import axios from "axios";

const PostAppProcess = async (app) => {

  const result = await axios.post("/api/applicationprocesses/", app);
  console.log(result.data.results);
};

export default PostAppProcess;
