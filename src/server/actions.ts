'use server'

import { differenceInDays } from "date-fns"
import { getServerAuthSession } from "./auth"
import db from "./db"

export const onGetWorkflows = async () => {
    const session = await getServerAuthSession()
    const user = session?.user
    if (user) {
      const workflow = await db.workflows.findMany({
        where: {
          userId: user.id,
        },
      })
  
      if (workflow) return workflow
    }
  }
  
  export const onCreateWorkflow = async (vision: string, fromDate: Date , toDate: Date) => {
    const session = await getServerAuthSession()
    const user = session?.user
    if (user) {
      const duration = differenceInDays(toDate, fromDate)
      //create new workflow
      const workflow = await db.workflows.create({
        data: {
          userId: user.id,
          vision,
          fromDate,
          toDate,
          duration,
        },
      })
  
      return workflow
    }
  }

  export const onCreateMilestones = async (
    milestones: { name: string; ToDate: string; FromDate: string; tasks: string[] }[], workflowId: string) => {
    const session = await getServerAuthSession()
          const user = session?.user
          if (user) {
            if(milestones) {
              for(let i = 0; i < milestones.length; i++) {
            let tasks = []
            if(milestones[i]?.tasks.length !== 0) {
            const tasksLength = milestones[i]?.tasks.length
            for(let j = 0; j < tasksLength!; j++) {
              tasks.push({
                title: milestones[i]?.tasks[j] ?? '',
              })
            }
          }
            await db.mileStone.create({
              data: {
                workFlowId: workflowId,
                title: milestones[i]?.name ?? '',
                ToDate: new Date(milestones[i]?.ToDate!),
                FromDate: new Date(milestones[i]?.FromDate!),
                // duration: 1,
                task: {
                  createMany: {
                    data: tasks
                  }
                }
              }
            });
            tasks = []
        }
        }
      }
  }

  export const getMilestones = async (workflowId: string) => {
    const session = await getServerAuthSession()
    const user = session?.user
    if (user) {
      const milestones = await db.mileStone.findMany({
        where: {
          workFlowId: workflowId,
        },
        orderBy: {
          ToDate: 'asc'
        },
        select: {
          title: true,
          ToDate: true,
          FromDate: true,
          isCompleted: true,
          task: {
            select: {
              id: true,
              title: true,
              isCompleted: true
            },
            orderBy: {
              isCompleted: 'asc'
            }
          }
        }
      })
  
      return milestones
    }
  }

  export const getWorkflow = async (workflowId: string) => {
    const session = await getServerAuthSession()
    const user = session?.user
    if (user) {
      const workflow = await db.workflows.findFirst({
        where: {
          id: workflowId,
        },
        select: {
          id: true,
          vision: true,
          fromDate: true,
          toDate: true,
          duration: true,
          mileStone: {
            select: {
              id: true,
              title: true,
              ToDate: true,
              FromDate: true,
              task: {
                select: {
                  id: true,
                  title: true,
                },
              }
            },
            orderBy: {
              ToDate: 'asc'
            }
          }
        },
      })
  
      return workflow
    } else {
      return null
    }
  }

  export const onTaskChecked = async (taskId: string , taskStatus: "InProgress" | "Completed" | "Pending") => {
    const session = await getServerAuthSession()
    const user = session?.user
    if (user) {
      const task = await db.task.update({
        where: {
          id: taskId,
        },
        data: {
          isCompleted: taskStatus,
        },
      })
      return task
    }
  }

  export const onVisionChange = async (vision: string, workflowId: string) => {
    const session = await getServerAuthSession()
    const user = session?.user
    if (user) {
      const workflow = await db.workflows.update({
        where: {
          id: workflowId,
        },
        data: {
          vision,
        },
      })
      return workflow
    } else {
      return
    }
  }

  export const addNewMilestone = async (milestone: { title: string; duration: {from: Date, to: Date}; tasks: {title: string}[] }, workflowId: string) => {
    const session = await getServerAuthSession()
    const user = session?.user
    if (user) {
      let tasks = []
      if(milestone?.tasks.length !== 0) {
        const tasksLength = milestone?.tasks.length
        for(let j = 0; j < tasksLength!; j++) {
          tasks.push({
            title: milestone?.tasks[j]?.title ?? '',
          })
        }
      }
      const newMilestone = await db.mileStone.create({
        data: {
          workFlowId: workflowId,
          title: milestone?.title ?? '',
          ToDate: milestone?.duration.to!,
          FromDate: milestone?.duration.from!,
          task: {
            createMany: {
              data: tasks.map((task) => {
                return {
                  title: task.title!,
                }
              })
            }
          }
        }
      });
      return newMilestone
    }
  }

  export const onEditMilestone = async (milestone: { id: string; title: string; duration: {from: Date, to: Date}; tasks: {id?: string; title: string}[] } , oldTasks: {id: string, title: string}[]) => {
    const session = await getServerAuthSession()
    const user = session?.user
    const deleteDefferenceInTasks = oldTasks.filter((element) => !milestone.tasks.map((task) => task.title).includes(element.title));
    await db.task.deleteMany({
      where: {
        title: {
          in: deleteDefferenceInTasks.map((task) => task.title)
        }
      }
    });

    console.log('differeceInTasks', deleteDefferenceInTasks);
    if (user) {
      let tasks = []
      if (milestone?.tasks.length !== 0) {
        const tasksLength = milestone?.tasks.length;
        for (let j = 0; j < tasksLength!; j++) {
          tasks.push({
            id: milestone?.tasks[j]?.id ?? '', // Fix: Add nullish coalescing operator to handle undefined id
            title: milestone?.tasks[j]?.title ?? '',
          });
        }
      }
      const updatedMilestone = await db.mileStone.update({
        where: {
          id: milestone.id,
        },
        data: {
          title: milestone.title,
          ToDate: milestone.duration.to,
          FromDate: milestone.duration.from,
          task: {
            upsert: tasks.map((task) => {
              return {
                where: {
                  id: task.id
                },
                update: {
                  title: task.title
                },
                create: {
                  title: task.title
                },
              }
            })
          }
        }
      });
      return updatedMilestone
    }
  }

  export const onDeleteMilestone = async (milestoneId: string) => {
    const session = await getServerAuthSession()
    const user = session?.user
    if (user) {
      const deletedMilestone = await db.mileStone.delete({
        where: {
          id: milestoneId,
        },
      })
      return deletedMilestone
    }
  }

  export const onDeleteWorkflow = async (workflowId: string) => {
    const session = await getServerAuthSession()
    const user = session?.user
    if (user) {
      const deletedWorkflow = await db.workflows.delete({
        where: {
          id: workflowId,
        },
      })
      return deletedWorkflow
    }
  }