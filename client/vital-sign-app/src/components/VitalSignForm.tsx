import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import {
  useAddVitalSign,
  useGetVitalSignById,
  useGetVitalSigns,
  useUpdateVitalSign,
} from "../hooks/useVitalSign";

const formSchema = z.object({
  temperature: z.coerce.number(),
  bloodPressure: z.coerce.number(),
  heartRate: z.coerce.number(),
  respiratoryRate: z.coerce.number(),
  oxygenSaturation: z.coerce.number(),
});

const VitalSignForm = () => {
  const { id } = useParams();
  const handleAdd = useAddVitalSign();
  const handleUpdate = useUpdateVitalSign();
  const data = useGetVitalSignById(id!);
  const { refetch } = useGetVitalSigns();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      temperature: 0,
      bloodPressure: 0,
      heartRate: 0,
      respiratoryRate: 0,
      oxygenSaturation: 0,
    },
  });

  useEffect(() => {
    if (data) {
      const { vitalSign } = data;
      form.setValue("temperature", vitalSign.temperature);
      form.setValue("bloodPressure", vitalSign.bloodPressure);
      form.setValue("heartRate", vitalSign.heartRate);
      form.setValue("respiratoryRate", vitalSign.respiratoryRate);
      form.setValue("oxygenSaturation", vitalSign.oxygenSaturation);
    }
  }, [data, form]);

  function onSubmit(formData: z.infer<typeof formSchema>) {
    id ? handleUpdate(id, formData) : handleAdd(formData);
    refetch();
  }

  return (
    <div>
      <h2 className="mb-3">{id ? "Edit" : "Add"} Vital Sign</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-1/3 m-auto"
        >
          <FormField
            control={form.control}
            name="temperature"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Temperature</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Add temperature..."
                    {...field}
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bloodPressure"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blood Pressure</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Add blood pressure..."
                    {...field}
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="heartRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Heart Rate</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Add heart rate..."
                    {...field}
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="respiratoryRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Respiratory Rate</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Add respiratory rate..."
                    {...field}
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="oxygenSaturation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Oxygen Saturation</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Add oxygen saturation..."
                    {...field}
                    type="number"
                  />
                </FormControl>
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

export default VitalSignForm;
