import { toast } from "react-toastify";

export const handleApiResponse = (res) => {
  if (res.data?.message) toast.success(res.data.message);
  else toast.error(res.data?.error || "Unexpected error!");
};

export const handleApiError = (err) => {
  console.log("Error:", err.response?.data || err.message);
  toast.error(err.response?.data?.message || "Something went wrong!");
};