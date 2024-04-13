import { usePredictDisease, useGetVitalSignById } from "@/hooks/useVitalSign";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const PredictionResult = () => {
  const { id } = useParams();
  const { handlePredict, data, loading } = usePredictDisease();
  const vitalSign = useGetVitalSignById(id!);

  const tableHeads = [
    "Temperature",
    "Blood Pressure",
    "Heart Rate",
    "Respiratory Rate",
    "Oxygen Saturation",
    "Patient",
    "Result",
  ];

  useEffect(() => {
    handlePredict(id!);
  }, []);

  if (loading)
    return (
      <div className="w-1/2 m-auto text-center">
        <Spinner />
        <p className="text-center mt-3">
          Please wait while we predict disease...
        </p>
      </div>
    );

  return (
    <Table className="w-3/5 m-auto mt-5">
      <TableHeader>
        <TableRow>
          {tableHeads.map((head) => (
            <TableHead key={head} className="text-center">
              {head}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{vitalSign?.vitalSign.temperature}</TableCell>
          <TableCell>{vitalSign?.vitalSign.bloodPressure}</TableCell>
          <TableCell>{vitalSign?.vitalSign.heartRate}</TableCell>
          <TableCell>{vitalSign?.vitalSign.respiratoryRate}</TableCell>
          <TableCell>{vitalSign?.vitalSign.oxygenSaturation}</TableCell>
          <TableCell>{vitalSign?.vitalSign.patient?.username}</TableCell>
          <TableCell
            className={
              data?.predictDisease.result
                ? "text-red-500 font-bold"
                : "text-black  font-bold"
            }
          >
            {data?.predictDisease.message}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default PredictionResult;
