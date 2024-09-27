import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://paw-pals-rescue-server.vercel.app",
});

function useAxiosPublic() {
  return axiosPublic;
}

export default useAxiosPublic;
