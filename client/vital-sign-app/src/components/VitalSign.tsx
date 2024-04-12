import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetVitalSigns } from "@/hooks/useVitalSign";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import Spinner from "./Spinner";

const VitalSign = () => {
  const { loading, error, data: vitalSignsData } = useGetVitalSigns();

  const tableHeads = [
    "Temperature",
    "Blood Pressure",
    "Heart Rate",
    "Respiratory Rate",
    "Oxygen Saturation",
    "Patient",
    "Action",
  ];

  if (loading) return <Spinner />;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Link to="/vital-sign/addVitalSign">
        <Button> Add Vital Sign </Button>
      </Link>

      <Table className="w-3/5 m-auto mt-5">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
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
          {vitalSignsData?.vitalSigns &&
            vitalSignsData?.vitalSigns.map((vitalSign) => (
              <TableRow key={vitalSign.id}>
                <TableCell>{vitalSign.temperature}</TableCell>
                <TableCell>{vitalSign.bloodPressure}</TableCell>
                <TableCell>{vitalSign.heartRate}</TableCell>
                <TableCell>{vitalSign.respiratoryRate}</TableCell>
                <TableCell>{vitalSign.oxygenSaturation}</TableCell>
                <TableCell>{vitalSign.patient?.username}</TableCell>
                <TableCell className="flex gap-3">
                  <Link to={`/vital-sign/edit/${vitalSign.id}`}>
                    <Button>Edit</Button>
                  </Link>
                  {/* This is only available for nurse -> hide if user is patient */}

                  <Link to={`/vital-sign/predictDisease/${vitalSign.id}`}>
                    <Button>Predict Disease</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VitalSign;
