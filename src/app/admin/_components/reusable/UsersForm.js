"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserSchema } from "@/validation/adminSchema";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn, capitalizeFirstLetter } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Gender } from "@prisma/client";
import { Switch } from "@/components/ui/switch";
import { Country, State, City } from "country-state-city";
import { useEffect, useState } from "react";
const UsersForm = ({ data }) => {
  const [selectedCountry, setSelectedCountry] = useState(data.country || "");
  const [selectedState, setSelectedState] = useState(data.state || "");
  const [selectedCity, setSelectedCity] = useState(data.city || "");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const getStates = (country) => {
    const filteredStates = State.getStatesOfCountry(country);

    return filteredStates;
  };

  const getCities = (countryCode, stateCode) => {
    const filteredCities = City.getCitiesOfState(countryCode, stateCode);

    return filteredCities;
  };

  const handleChangeCountry = (country) => {
    setSelectedCountry(country);
    setSelectedState("");
    setSelectedCity("");

    setStates(getStates(country));
    setCities([]);
  };

  const handleChangeState = (state) => {
    setSelectedState(state);
    setSelectedCity("");
    setCities(getCities(selectedCountry, state));
  };

  useEffect(() => {
    if (data.country) {
      setStates(getStates(data.country));
      setCities(getCities(data.country, data.state));
    }
  }, [data]);

  const form = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      email: data.email || "",
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      birthdate: data.birthdate || "",
      gender: data.gender || "",
      country: data.country || "",
      state: data.state || "",
      city: data.city || "",
      address1: data.address1 || "",
      hasAdminAccess: data.hasAdminAccess || "",
    },
  });

  const onSubmit = (form) => {
    // we destructure the country since we are getting the actual changed value from the local state already and we
    //don't want to preserve the old value which this form have and then we pass the selectedCountry afterwards
    const { country, state } = form;
    const data = {
      ...form,
      country: selectedCountry,
      state: selectedState,
    };

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit User</CardTitle>
      </CardHeader>
      <hr className="mx-5 border-t border-slate-400 py-2" />
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6">
            <CardTitle className="text-xl">Personal Information</CardTitle>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field} disabled={true} />
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
            <hr className="border-t border-slate-400 my-auto" />
            <CardTitle className="text-xl">Address Information</CardTitle>

            <div className="w-full flex flex-row gap-5">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <>
                    <FormItem className="w-1/2 flex flex-col">
                      <FormLabel>Country</FormLabel>
                      <Select
                        onValueChange={(country) =>
                          handleChangeCountry(country)
                        }
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Country.getAllCountries().map((country) => (
                            <SelectItem
                              key={country.name}
                              value={country.isoCode}>
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <>
                    <FormItem className="w-1/2 flex flex-col">
                      <FormLabel>State</FormLabel>
                      <Select
                        onValueChange={(state) => handleChangeState(state)}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a state" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state.name} value={state.isoCode}>
                              {state.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <>
                    <FormItem className="w-1/2 flex flex-col">
                      <FormLabel>City</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a city" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {cities !== undefined &&
                          cities !== null &&
                          cities.length > 0 ? (
                            cities.map((city) => (
                              <SelectItem key={city.name} value={city.name}>
                                {city.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value={null}>
                              No Cities Found.
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
            </div>
            <div className="w-full flex flex-col">
              <FormField
                control={form.control}
                name="address1"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Address Line 1</FormLabel>
                      <FormControl>
                        <Input placeholder="address1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
            </div>
            <CardTitle className="text-xl">Security Settings</CardTitle>

            <div className="w-full flex flex-col">
              <FormField
                control={form.control}
                name="hasAdminAccess"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Admin Dashboard Access</FormLabel>
                      <FormDescription className="text-xs text-muted-foreground italic">
                        <strong>NOTE:</strong> This should only be ticked when
                        granting admin access to a specific user.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className="text-sm italic">
          Please remember that any changes made will directly reflect on the
          front store page.
        </p>
      </CardFooter>
    </Card>
  );
};

export default UsersForm;
