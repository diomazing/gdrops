import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CardTitle } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContext } from "react";
import { AddressContext } from "../UsersForm";

const Address = () => {
  const {
    Country,
    handleChangeCountry,
    handleChangeState,
    states,
    cities,
    form,
  } = useContext(AddressContext);

  return (
    <>
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
                  onValueChange={(country) => handleChangeCountry(country)}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Country.getAllCountries().map((country) => (
                      <SelectItem key={country.name} value={country.isoCode}>
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
                      <SelectItem value={null}>No Cities Found.</SelectItem>
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
                  <Input placeholder="Street, House Number, etc" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
      </div>
    </>
  );
};

export default Address;
