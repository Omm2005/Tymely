import { WorkflowFormSchema } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { z } from 'zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useModal } from '@/Provider/modal-provider'
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from '@/lib/utils'
import { Calendar } from '../ui/calendar'
import { useClientMediaQuery } from '@/hooks/useClientMediaQuery'
import { onCreateMilestones, onCreateWorkflow } from '@/server/actions'
import AIChatPlanner from '@/server/config'

type Props = {
  title?: string
  subTitle?: string
}

const Workflowform = ({ subTitle, title }: Props) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  const { setClose, setLoading } = useModal()
  const form = useForm<z.infer<typeof WorkflowFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(WorkflowFormSchema),
    defaultValues: {
      vision: '',
      duration: {
          from: undefined,
          to: undefined,
      },
    },
  })

  const router = useRouter()
  const isLoading = form.formState.isSubmitting

  const OnSubmit = async (values: z.infer<typeof WorkflowFormSchema>) => {
    try{
      setLoading(true)
      const result: {
        vision: string;
        milestones: { name: string; FromDate: string; ToDate: string; tasks: string[] }[];
      } = await AIChatPlanner(values)
      const vision = result.vision
      const milestone = result.milestones
      if(result) {
        const workflow = await onCreateWorkflow(vision, values.duration.from, values.duration.to)
        if (workflow) {
          router.refresh()
          await onCreateMilestones(milestone, workflow.id) // Remove the second argument
          toast.success("Workflow created successfully")
        }
        setClose()
      }
      } catch (error) {
        toast.error("Try again after few minutes. GEMINI IS ON IT'S EDGE!!")
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

  return (
    <Card className="w-full max-w-[650px] border-none relative">
      {title && subTitle && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{subTitle}</CardDescription>
        </CardHeader>
      )}
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
                    to: field.value.to,
                  }}
                  disabled={(date) =>
                     date < yesterday
                  }
                  onSelect={field.onChange}
                  numberOfMonths={isMobile ? 1 : 2}
                />
              </PopoverContent>
            </Popover>
            <FormDescription>Select the start and end date</FormDescription>
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

export default Workflowform