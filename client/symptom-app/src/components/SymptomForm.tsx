import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import {
  useAddSymptom,
  useGetSymptomById,
  useGetSymptoms,
  useUpdateSymptom,
} from "../hooks/useSymptom";
import { symptoms } from "../entities/types";

const formSchema = z.object({
  patientName: z.string(),
  selectedSymptoms: z.array(z.string()),
});

const SymptomForm = () => {
  const { id } = useParams();
  const handleAdd = useAddSymptom();
  const handleUpdate = useUpdateSymptom();
  const data = useGetSymptomById(id!);
  const { refetch } = useGetSymptoms();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientName: "",
      selectedSymptoms: [],
    },
  });

  useEffect(() => {
    if (data) {
      const { checklist } = data;
      form.setValue("patientName", checklist.patientName);
      form.setValue("selectedSymptoms", checklist.selectedSymptoms);
    }
  }, [data, form]);

  function onSubmit(formData: z.infer<typeof formSchema>) {
    id ? handleUpdate(id, formData) : handleAdd(formData);
    refetch();
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-1/3 m-auto"
        >
          <FormField
            control={form.control}
            name="patientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patient Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Add Patient Name..."
                    {...field}
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="selectedSymptoms"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Symptoms list</FormLabel>
                </div>
                {symptoms.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="selectedSymptoms"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default SymptomForm;
