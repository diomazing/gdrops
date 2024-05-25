import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { Gender } from "@prisma/client";
import { CalendarIcon } from "lucide-react";
import { PersonalInformationContext } from "../UsersForm";
import { useContext } from "react";
import { format } from "date-fns";

const PersonalInformation = () => {
  const { form, mode } = useContext(PersonalInformationContext);
  return (
    <>
      <CardTitle className="text-xl">Personal Information</CardTitle>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <>
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email"
                  {...field}
                  disabled={mode === "update"}
                />
              </FormControl>
              <FormDescription>
                This is the users unique account identifier.
              </FormDescription>
              <FormMessage />
            </FormItem>
          </>
        )}
      />
      <div className="w-full flex flex-row gap-5 ">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <>
              <FormItem className="w-1/2">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="First name"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <>
              <FormItem className="w-1/2">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
      </div>

      <div className="w-full flex flex-row gap-5">
        <FormField
          control={form.control}
          name="birthdate"
          render={({ field }) => (
            <>
              <FormItem className="w-1/2 flex flex-col">
                <FormLabel>Date of Birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}>
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <>
              <FormItem className="w-1/2 flex flex-col">
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(Gender).map(([key, value]) => (
                      <SelectItem key={key} value={value}>
                        {capitalizeFirstLetter(key)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
      </div>
    </>
  );
};

export default PersonalInformation;
