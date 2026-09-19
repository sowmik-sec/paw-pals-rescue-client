import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

function useAdmin() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/v1/users/admin/${user?.email}`);
      return res.data?.admin;
    },
  });
  return [isAdmin, isAdminLoading];
}

export default useAdmin;
