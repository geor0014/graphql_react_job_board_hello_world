import { getAccessToken } from "../auth";
import {
  JOBS_QUERY,
  COMPANY_QUERY,
  CREATE_JOB_MUTATION,
  getJob,
} from "../graphql/queries";
import { useMutation, useQuery } from "@apollo/client";

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

export function useCreateJob() {
  const [mutate, { loading, error }] = useMutation(CREATE_JOB_MUTATION);

  return {
    createJob: async (title, description) => {
      const {
        data: { job },
      } = await mutate({
        variables: { input: { title, description } },
        context: {
          headers: { Authorization: "Bearer " + getAccessToken() },
        },
        update: (cache, { data: { job } }) => {
          cache.writeQuery({
            query: getJob,
            variables: { id: job.id },
            data: { job },
          });
        },
      });
      return job;
    },
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
