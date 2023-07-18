import { Job, Company } from "./db.js";

export const resolvers = {
  Query: {
    job: (parent, args) => Job.findById(args.id),
    jobs: async () => Job.findAll(),
    company: (parent, args) => Company.findById(args.id),
  },

  Mutation: {
    createJob: (parent, { input }, context) => {
      if (!context.user) throw new Error("Not authenticated");
      return Job.create({ ...input, companyId: context.user.companyId });
    },
    deleteJob: async (parent, { id }) => {
      // check if the user is authenticated and owns the job
      if (!context.user) throw new Error("Not authenticated");

      const job = await Job.findById(id);

      if (context.user.companyId !== job.companyId) {
        throw new Error("User not authorized");
      }
      return Job.delete(id);
    },
    updateJob: async (parent, { input }) => {
      if (!context.user) throw new Error("Not authenticated");

      const job = await Job.findById(input.id);

      if (context.user.companyId !== job.companyId) {
        throw new Error("User not authorized");
      }

      return Job.update({ ...input, companyId: context.user.companyId });
    },
  },

  Job: {
    //   in this case the parent is each job object in the array of jobs returned from the resolver for the jobs query
    company: async (parent) => Company.findById(parent.companyId),
  },

  Company: {
    jobs: async (parent) => Job.findAll((job) => job.companyId === parent.id),
  },
};
