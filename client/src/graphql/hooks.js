import { JOBS_QUERY, COMPANY_QUERY } from "../graphql/queries";
import { useQuery } from "@apollo/client";

export function useJobs() {
  const { data, loading, error } = useQuery(JOBS_QUERY, {
    fetchPolicy: "network-only",
  });

  return {
    jobs: data?.jobs,
    loading,
    error: Boolean(error),
  };
}

export function useCompany(id) {
  const { data, loading, error } = useQuery(COMPANY_QUERY, {
    variables: { id },
  });

  return {
    company: data?.company,
    loading,
    error: Boolean(error),
  };
}
