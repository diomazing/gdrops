"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "@/validation/adminSchema";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Country, State, City } from "country-state-city";
import { createContext, useEffect, useState, useTransition } from "react";
import { addUser, updateUser } from "../../_actions/user";
import { useParams, useRouter } from "next/navigation";
import Address from "./forms/Address";
import Personal from "./forms/PersonalInformation";
import SubmitButton from "./forms/SubmitButton";

export const AddressContext = createContext(null);
export const PersonalInformationContext = createContext(null);

const UsersForm = ({ data }) => {
  // we are getting the dynamic id params to be passed to the server actions
  const { id } = useParams();

  //using the latest next/navigation route so we can redirect/push to another page
  const router = useRouter();

  //we are using the built-in useTransition from react to get to use loading state
  const [isPending, startTranstion] = useTransition();

  //we create a local state to check whether we are in create/edit user
  const [mode, setMode] = useState(data?.email ? "update" : "create");

  //states to manage selected country, state and city for further processing
  const [selectedCountry, setSelectedCountry] = useState(data?.country || "");
  const [selectedState, setSelectedState] = useState(data?.state || "");
  const [selectedCity, setSelectedCity] = useState(data?.city || "");

  //we store local values for city and states to not overload the select options that might cause the UI to slow down and unresponsive
  //used to store specific data regarding states of a specific country
  const [states, setStates] = useState([]);

  //used to store specific data regarding cities of a specific state
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
    if (data?.country) {
      setStates(getStates(data?.country));
      setCities(getCities(data?.country, data?.state));
    }
  }, [data]);

  const form = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      email: data?.email || "",
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      birthdate: data?.birthdate || "",
      gender: data?.gender || "",
      country: data?.country || "",
      state: data?.state || "",
      city: data?.city || "",
      address1: data?.address1 || "",
      hasAdminAccess: data?.hasAdminAccess || false,
    },
  });

  const onSubmitCreate = async (form) => {
    const data = {
      ...form,
      id,
      country: selectedCountry,
      state: selectedState,
    };

    try {
      startTranstion(async () => {
        const result = await addUser(data);

        if (result) {
          toast({
            description: (
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500" />
                <span className="ml-2 ">User added successfully</span>
              </div>
            ),
          });

          router.push("/admin/users");
        }
      });
    } catch (error) {
      const { response } = error;
      const { data, status } = response || {};

      if (status === 400 || status === 409) {
        const { message } = data || { message: "Something went wrong" };

        toast({
          title: "Error occurred",
          variant: "destructive",
          status: "error",
          description: message,
        });
      } else {
        console.log("err", error);
      }
    }
  };
  const onSubmitEdit = async (form) => {
    // we destructure the country since we are getting the actual changed value from the local state already and we
    //don't want to preserve the old value which this form have and then we pass the selectedCountry afterwards
    const { country, state } = form;
    const data = {
      ...form,
      id,
      country: selectedCountry,
      state: selectedState,
    };

    try {
      startTranstion(async () => {
        const result = await updateUser(data);

        if (result) {
          toast({
            description: (
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500" />
                <span className="ml-2 ">User updated successfully</span>
              </div>
            ),
          });

          router.push("/admin/users");
        }
      });
    } catch (error) {
      const { response } = error;
      const { data, status } = response || {};

      if (status === 400 || status === 409) {
        const { message } = data || { message: "Something went wrong" };

        toast({
          title: "Error occurred",
          variant: "destructive",
          status: "error",
          description: message,
        });
      } else {
        console.log("err", error);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {data !== undefined ? "Edit User" : "Create User"}
        </CardTitle>
      </CardHeader>
      <hr className="mx-5 border-t border-slate-400 py-2" />
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={
              mode === "create"
                ? form.handleSubmit(onSubmitCreate)
                : form.handleSubmit(onSubmitEdit)
            }
            className="w-2/3 space-y-6">
            <PersonalInformationContext.Provider value={{ form, mode }}>
              <Personal />
            </PersonalInformationContext.Provider>
            <hr className="border-t border-slate-400 my-auto" />
            <AddressContext.Provider
              value={{
                form,
                handleChangeCountry,
                handleChangeState,
                Country,
                states,
                cities,
              }}>
              <Address />
            </AddressContext.Provider>
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

            <SubmitButton isPending={isPending} />
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
