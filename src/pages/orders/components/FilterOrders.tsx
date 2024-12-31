import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { filterOrderSchema } from 'src/schemas'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from 'src/components/ui/accordion'

import { Button } from 'src/components/ui/button'
import { CalendarIcon } from 'lucide-react'
import { cn } from 'src/lib/utils'
import { format } from 'date-fns'
import { Calendar } from 'src/components/ui/calendar'
import { PropagateLoader } from 'react-spinners'

export type FormValues = z.infer<typeof filterOrderSchema>

type Props = {
  handleApplyFilter: (data: FormValues) => void
  handleClearFilter: () => void
  isLoading: boolean
  enabled: boolean
}

const FilterOrders = ({ handleApplyFilter, handleClearFilter, isLoading, enabled }: Props) => {
  const filterOrdersForm = useForm<FormValues>({
    resolver: zodResolver(filterOrderSchema),
  })
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="max-w-md mb-3">
        <AccordionTrigger>Filter orders</AccordionTrigger>
        <AccordionContent>
          <Form {...filterOrdersForm}>
            <form className="flex flex-col max-w-md gap-1" onSubmit={filterOrdersForm.handleSubmit(handleApplyFilter)}>
              <FormField
                control={filterOrdersForm.control}
                name="refCode"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel>Ref code</FormLabel>
                    <FormControl>
                      <Input placeholder="SADGDSSDFRE" {...field} className="w-full" />
                    </FormControl>
                    <FormDescription>M-pesa reference code.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={filterOrdersForm.control}
                name="paymentMode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment method</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="poppins-regular">
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="m-pesa">M-pesa</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Payment method used</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={filterOrdersForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="poppins-regular">
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="processed">Processed</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Select the order status</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={filterOrdersForm.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>From</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                          >
                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 poppins-regular" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Select a start date.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={filterOrdersForm.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>To</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                          >
                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 poppins-regular" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Select an end date.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="my-10 flex flex-col items-center  gap-6">
                {isLoading && enabled && <PropagateLoader color="#4E97FD" />}
                <div className="flex items-center w-full gap-3">
                  <Button
                    type="submit"
                    className="w-full bg-sky flex items-center "
                    disabled={!filterOrdersForm.formState.isDirty || (isLoading && enabled)}
                  >
                    Apply filter
                  </Button>
                  <Button
                    type="button"
                    className="w-full text-red-500 flex items-center"
                    onClick={() => {
                      filterOrdersForm.reset()
                      handleClearFilter()
                    }}
                    disabled={!enabled}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default FilterOrders
