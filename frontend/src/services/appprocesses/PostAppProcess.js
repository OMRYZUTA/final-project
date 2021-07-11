import axios from "axios";

const PostAppProcess = async (app) => {
  const result = await axios.post("/api/applicationprocesses/", app);

  console.log("in PostAppProcess: ", result);
  return result;
};

export default PostAppProcess;
