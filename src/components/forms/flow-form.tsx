'use client'

import { EditMilestoneType, Milestone, VisionFormSchema } from '@/lib/types'
import { v4 as uuidv4 } from 'uuid';
import { useModal } from '@/Provider/modal-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Card, CardContent } from '../ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { toast } from 'sonner'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { CalendarIcon, Loader2, Trash } from 'lucide-react'
import { addNewMilestone, onEditMilestone, onVisionChange } from '@/server/actions'
import { useRouter } from 'next/navigation'
import { Input } from '../ui/input'
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from 'date-fns'
import { Calendar } from '../ui/calendar'
import { useClientMediaQuery } from '@/hooks/useClientMediaQuery'
import { cn } from '@/lib/utils'

type Props = {
  workflowId: string,
  type: 'vision' | 'milestone' | 'newMilestone',
  visionTitle?: string,
  milestone?: {
    id: string;
    task: {
        id: string;
        title: string;
    }[];
    title: string;
    ToDate: Date;
    FromDate: Date;
  },
  duration: {
    from: Date,
    to: Date
  }
}


const EditVision = ({ vision, workflowId }: { vision: string, workflowId: string }) => {
  const { setClose, setLoading } = useModal()
  const router = useRouter()
  const form = useForm<z.infer<typeof VisionFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(VisionFormSchema),
    defaultValues: {
      vision: vision,
    },
  })

  const OnSubmit = async (data: z.infer<typeof VisionFormSchema>) => {
    setLoading(true)
    try {
      const result = await onVisionChange(data.vision, workflowId)
      if (result) {
        setClose()
        toast.success('Vision updated')
        router.refresh()
      }
    } catch (error) {
      toast.error('Error updating vision')
    }
    setLoading(false)
  }

  const isLoading = form.formState.isSubmitting

  return (

    <Card className="w-full border-none relative">

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(OnSubmit)}
            className="flex flex-col gap-4 text-left"
          >
            <FormField
              disabled={isLoading}
              control={form.control}
              name="vision"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vision</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="What do you want to work on?"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="mt-4"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving
                </>
              ) : (
                'Save Settings'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

const AddMilestone = ({ workflowId, duration }: {
  workflowId: string, duration: {
    from: Date,
    to: Date
  }
}) => {
  const { setClose, setLoading } = useModal()
  const [ key, setKey ] = React.useState(0)
  const router = useRouter()
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  const form = useForm<z.infer<typeof Milestone>>({
    mode: 'onChange',
    resolver: zodResolver(Milestone),
    defaultValues: {
      title: '',
      duration: {
        from: duration.from,
        to: duration.to
      },
      tasks: []
    },
  })
  const { append, remove } = useFieldArray({ control: form.control, name: 'tasks' });

  const OnSubmit = async (data: z.infer<typeof Milestone>) => {
    setLoading(true)
    try {
      const result = await addNewMilestone(data, workflowId)
      if(result) {
      setClose()
      toast.success('Milestone added')
      router.refresh()
      }
    } catch (error) {
      toast.error('Error adding milestone')
    }
    setLoading(false)
  }
  const isLoading = form.formState.isSubmitting

  return (

    <Card className="w-full border-none relative">

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(OnSubmit)}
            className="flex flex-col gap-4 text-left"
          >
            <FormField
              disabled={isLoading}
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Milestone Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="What do you want to work on?"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start and End Date</FormLabel>
                  <Popover modal={true}>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value.from && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value.from ? (
                          field.value.to ? (
                            <>
                              {format(field.value.from, "PPP")} -{" "}
                              {format(field.value.to, "PPP")}
                            </>
                          ) : (
                            format(field.value.from, "PPP")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 overflow-auto" align="center">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={field.value.from}
                        selected={{
                          from: field.value.from!,
                          to: field.value.to!,
                        }}
                        disabled={(date) =>
                          date < duration.from || date > duration.to
                        }
                        onSelect={field.onChange}
                        numberOfMonths={isMobile ? 1 : 2}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Select the start and end date</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
                {form.getValues('tasks').map((field, index) => (
      <FormField
      key={`${index}-${key}`}
        control={form.control}
        name={`tasks.${index}.title`}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Task Title</FormLabel>
            <FormControl>
              <div className='flex gap-2'>
              <Input
                {...field}
                className="w-full justify-start text-left font-normal"
                />
              <Button variant={'ghost'} onClick={() => { remove(index); setKey(prevKey => prevKey + 1);}}>
              <Trash className="h-4 w-4 group-hover:text-red-300" />
            </Button>
                </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ))}
    <Button type='button' onClick={() => append({ title: "Omm is the best!!"})}>
      Add Task
    </Button>
            <Button
              className="mt-4"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving
                </>
              ) : (
                'Save Settings'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

const EditMilestone = ({ duration , milestone }: {
  duration: {
    from: Date,
    to: Date
  },
  milestone: {
    id: string;
    task: {
        id: string;
        title: string;
    }[];
    title: string;
    ToDate: Date;
    FromDate: Date;
  }
}) => {
  const { setClose, setLoading } = useModal()
  const [ key, setKey ] = React.useState(0)
  const router = useRouter()
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  const form = useForm<z.infer<typeof EditMilestoneType>>({
    mode: 'onChange',
    resolver: zodResolver(EditMilestoneType),
    defaultValues: {
      title: milestone.title,
      duration: {
        from: milestone.FromDate,
        to: milestone.ToDate
      },
      tasks: milestone.task
    },
  })
  const { append, remove } = useFieldArray({ control: form.control, name: 'tasks' });

  const OnSubmit = async (data: z.infer<typeof EditMilestoneType>) => {
    setLoading(true)
    try {
      const formattedData = {
        ...data,
        id: milestone.id,
        tasks: data.tasks.map(task => {
          if(task.id) {
            return {
              id: task.id,
              title: task.title
            }
          } else {
            return {
              title: task.title
            }
          }
        })
      }
      const result = await onEditMilestone(formattedData , milestone.task)
      if(result) {
      setClose()
      toast.success('Milestone updated')
      router.refresh()
      }
    } catch (error) {
      toast.error('Error updating milestone')
    }
    setLoading(false)
  }

  const isLoading = form.formState.isSubmitting

  return (

    <Card className="w-full border-none relative">

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(OnSubmit)}
            className="flex flex-col gap-4 text-left"
          >
            <FormField
              disabled={isLoading}
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Milestone Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="What do you want to work on?"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start and End Date</FormLabel>
                  <Popover modal={true}>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value.from && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value.from ? (
                          field.value.to ? (
                            <>
                              {format(field.value.from, "PPP")} -{" "}
                              {format(field.value.to, "PPP")}
                            </>
                          ) : (
                            format(field.value.from, "PPP")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 overflow-auto" align="center">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={field.value.from}
                        selected={{
                          from: field.value.from!,
                          to: field.value.to!,
                        }}
                        disabled={(date) =>
                          date < duration.from || date > duration.to
                        }
                        onSelect={field.onChange}
                        numberOfMonths={isMobile ? 1 : 2}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Select the start and end date</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
                   {form.getValues('tasks').map((field, index) => (
      <FormField
      key={`${index}-${key}`}
        control={form.control}
        name={`tasks.${index}.title`}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Task Title</FormLabel>
            <FormControl>
              <div className='flex gap-2'>
                <Input
                  {...field}
                  className="w-full justify-start text-left font-normal"
                  onChange={e => {
                    field.onChange(e); // default handler
                    // additional logic here if needed
                  }}
                />
                <Button type='button' variant='ghost' className='group' onClick={() => { remove(index); setKey(prevKey => prevKey + 1); }}>
                  <Trash className="h-4 w-4 group-hover:text-red-300" />
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ))}
    <Button type='button' onClick={() => append({ title: "Omm is Bestt!", id: uuidv4() })}>
      Add Task
    </Button>
            <Button
              className="mt-4"
              disabled={isLoading}
              type="submit"
              onClick={() => OnSubmit(form.getValues())}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving
                </>
              ) : (
                'Save Settings'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

const FlowForm = ({
  type,
  visionTitle,
  milestone,
  workflowId,
  duration
}: Props) => {
  return (
    <div className='md:w-1/2 w-full'>
      {
        (type === 'vision' && visionTitle) && <EditVision vision={visionTitle} workflowId={workflowId} />
      }
      {
        (type === 'newMilestone') && <AddMilestone workflowId={workflowId} duration={duration} />
      }
      {
            (type === 'milestone' && milestone) && <EditMilestone duration={duration} milestone={milestone} />
        }
    </div>
  )
}

export default FlowForm