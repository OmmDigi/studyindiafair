import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { get } from "../../utils/fetcher";

export const useSiteSettings = (options?: UseQueryOptions<any, Error, any>) => {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: () => get("/site-settings/public"),
    ...options,
  });
};
