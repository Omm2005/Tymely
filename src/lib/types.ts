import { z } from "zod";

const today = new Date();
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

export const WorkflowFormSchema = z.object({
    vision: z.string().min(1, 'Required'),
    duration: z
    .object({
          from: z.date().min(yesterday, 'From date must be yesterday'),
          to: z.date().min(today, 'To Date should be not today'),
    })
    .refine((data) => data.from < data.to, {
      path: ["dateRange"],
      message: "Invalid Date Range",
    })
  })

  export const VisionFormSchema = z.object({
    vision: z.string().min(1, 'Required'),
  })

  export const Milestone = z.object({
    title: z.string().min(1, 'Required'),
    duration: z
    .object({
          from: z.date().min(new Date(), 'From date must be after today'),
          to: z.date().min(today, 'To date must be after today'),
    })
    .refine((data) => data.from < data.to, {
      path: ["dateRange"],
      message: "From date must be before to date",
    }),
    tasks: z.array(z.object({
      title: z.string().min(1, 'Required')
    }))
  })

  export const EditMilestoneType = z.object({
    id: z.string(),
    title: z.string().min(1, 'Required'),
    duration: z
    .object({
          from: z.date().min(new Date()).refine((value) => value !== undefined, 'Required'),
          to: z.date().min(today).refine((value) => value !== undefined, 'Required'),
    })
    .refine((data) => data.from < data.to, {
      path: ["dateRange"],
      message: "From date must be before to date",
    }),
    tasks: z.array(z.object({
      id: z.string().optional(),
      title: z.string().min(1, 'Required')
    }))
  })