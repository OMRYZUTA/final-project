import axios from "axios";

const PutAppProcess = async (app) => {
  const result = await axios.put(app.url, app);
  console.log("in PutAppProcess: ", result);
  return result;
};
export default PutAppProcess;
