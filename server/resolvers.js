import { Job, Company } from "./db.js";

export const resolvers = {
  Query: {
    job: (parent, args) => Job.findById(args.id),
    jobs: async () => Job.findAll(),
    company: (parent, args) => Company.findById(args.id),
  },

  Job: {
    //   in this case the parent is each job object in the array of jobs returned from the resolver for the jobs query
    company: async (parent) => Company.findById(parent.companyId),
  },
};
