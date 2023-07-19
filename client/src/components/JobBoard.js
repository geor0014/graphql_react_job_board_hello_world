import { useJobs } from "../graphql/hooks";
import JobList from "./JobList";

function JobBoard() {
  const { jobs, loading, error } = useJobs();

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Something went wrong!</h1>;
  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
