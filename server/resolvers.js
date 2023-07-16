import { Job, Company } from "./db.js";

export const resolvers = {
  Query: {
    job: (parent, args) => Job.findById(args.id),
    jobs: async () => Job.findAll(),
    company: (parent, args) => Company.findById(args.id),
  },

  Mutation: {
    createJob: (parent, { input }) => Job.create(input),
  },

  Job: {
    //   in this case the parent is each job object in the array of jobs returned from the resolver for the jobs query
    company: async (parent) => Company.findById(parent.companyId),
  },

  Company: {
    jobs: async (parent) => Job.findAll((job) => job.companyId === parent.id),
  },
};
