import { usePredictDisease, useGetVitalSignById } from "@/hooks/useVitalSign";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "./Spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { VitalSign } from "@/entities/types";
import Chart from "./Chart";

const PredictionResult = () => {
  const { id } = useParams();
  const { handlePredict, data, loading } = usePredictDisease();
  const vitalSign = useGetVitalSignById(id!);
  const [chartData, setChartData] = useState<VitalSign[]>([]);

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

  useEffect(() => {
    if (vitalSign) setChartData([vitalSign.vitalSign]);
  }, [vitalSign]);

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
    <div className="flex flex-col gap-5">
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
      <Link to="/vital-sign">
        <Button>Back to Vital Signs</Button>
      </Link>
      <Chart vital_signs={chartData} />
    </div>
  );
};

export default PredictionResult;
