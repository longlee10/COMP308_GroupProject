import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Benefits = () => {
  const nurseBenfits = [
    "Vital Signs Monitoring",
    "Access to Historical Data",
    "Daily Motivational Tips",
    "Medical Condition Assessment",
  ];
  const patientBenefits = [
    "Emergency Alert System",
    "Fitness Games Page",
    "Daily Health Tracking",
    "Symptom Checklist",
  ];

  return (
    <div className="flex justify-center gap-16 m-auto mb-20">
      <Card className="w-[350px] mt-4">
        <CardHeader>
          <CardTitle>Use for Nurse Practioners</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className=" ml-6 list-disc [&>li]:mt-2 text-left">
            {nurseBenfits.map((benefit) => (
              <li key={benefit}>
                <b>{benefit}</b>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex flex-col">
          <blockquote className="italic">
            "This application has being supporting me in my daily tasks as a
            nurse practitioner. It has helped me to monitor my patients' health
            and provide timely interventions when necessary. I highly recommend
            it to my colleagues."
          </blockquote>
          <p className="mt-6 font-semibold">
            - Nurse Practitioner, Toronto General Hospital
          </p>
        </CardFooter>
      </Card>

      <Card className="w-[350px] mt-4">
        <CardHeader>
          <CardTitle>Use for Patients</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className=" ml-6 list-disc [&>li]:mt-2 text-left">
            {patientBenefits.map((benefit) => (
              <li key={benefit}>
                <b>{benefit}</b>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex flex-col">
          <blockquote className="italic">
            "It's being a life-saver for me. I can easily track my health data
            and receive timely alerts when needed. I feel more secure knowing
            that help is just a click away."
          </blockquote>
          <p className="mt-6 font-semibold">
            - James Smith, Patient (user since 2022)
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Benefits;
