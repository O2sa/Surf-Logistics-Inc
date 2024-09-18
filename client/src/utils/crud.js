import { useMutation, useQuery } from "@tanstack/react-query";
import customFetch from "./customFetch";
import { getNotfication } from "./notfications";
import { useAppContext } from "../App";

export function useCrudOperations(query, route, opt = "update") {
  const { queryClient } = useAppContext();
  return useMutation({
    mutationFn: async (element) => {
      // console.log('delete id:', eleId)
      const response =
        opt == "update"
          ? await customFetch.patch(
              `${route.join("/")}/${element._id}`,
              element
            )
          : opt == "create"
          ? await customFetch.post(`${route.join("/")}`, element)
          : await customFetch.delete(`${route.join("/")}/${element}`);
      return response.data;
    },
    onError: (error) => {
      getNotfication(false, error?.response?.data?.msg);
      throw error; // Re-throw the error for handling in handleSubmit
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: query }),
  });
}

export function useGetElements({ query, params = {}, fetchOptions = {} }) {
  return useQuery({
    queryKey: [...query, params],
    queryFn: async ({ queryKey }) => {
      const { data } = await customFetch.get(`${query.join("/")}`, { params }); // Adjust this URL as per your API route
      console.log("all geten elements:", data);
      return data;
    },
    refetchOnWindowFocus: false,
    ...fetchOptions,
  });
}
