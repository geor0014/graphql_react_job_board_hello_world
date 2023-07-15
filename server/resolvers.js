import { Job, Company } from "./db.js";

export const resolvers = {
  Query: {
    jobs: async () => Job.findAll(),
  },

  Job: {
    //   in this case the parent is each job object in the array of jobs returned from the resolver for the jobs query
    company: async (parent) => Company.findById(parent.companyId),
  },
};
