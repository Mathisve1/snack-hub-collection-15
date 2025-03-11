
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { frituurFormSchema, type FrituurFormValues } from "../utils/formConstants";
import { useSubmitFrituur } from "./useSubmitFrituur";
import { handlePhoneNumberChange } from "../utils/phoneNumberHandler";

export const useFrituurForm = (team: string) => {
  const { isSubmitting, submitFrituur } = useSubmitFrituur(team);

  const form = useForm<FrituurFormValues>({
    resolver: zodResolver(frituurFormSchema),
    defaultValues: {
      "Business Name": "",
      Provincie: "",
      Gemeente: "",
      Straat: "",
      Number: "",
      Postcode: "",
      PhoneNumber: "",
      Website: "",
      Email: "",
      "Facebook Link": "",
      "Instagram link": "",
      "Linkedin Link": "",
      "Open & Close Time": "",
      Rating: "",
      Category: "",
      Review: "",
    },
  });

  const onSubmit = async (values: FrituurFormValues) => {
    await submitFrituur(values);
  };

  return {
    form,
    isSubmitting,
    onSubmit,
    handlePhoneNumberChange
  };
};
