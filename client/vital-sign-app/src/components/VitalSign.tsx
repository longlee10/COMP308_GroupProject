import { useQuery } from "@apollo/client";
import { VITAL_SIGNS } from "../queries/vitalSignQueries";
import { Link } from "react-router-dom";
import { VitalSignsData } from "../entities/types";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const VitalSign = () => {
  const { loading, error, data } = useQuery<VitalSignsData>(VITAL_SIGNS);
  const tableHeads = [
    "Temperature",
    "Blood Pressure",
    "Heart Rate",
    "Respiratory Rate",
    "Action",
  ];

  if (loading) return <p>Loading...</p>;
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
          {data?.vitalSigns &&
            data?.vitalSigns.map((vitalSign) => (
              <TableRow key={vitalSign.id}>
                <TableCell>{vitalSign.temperature}</TableCell>
                <TableCell>{vitalSign.bloodPressure}</TableCell>
                <TableCell>{vitalSign.heartRate}</TableCell>
                <TableCell>{vitalSign.respiratoryRate}</TableCell>
                <TableCell>
                  <Link to={`/vital-sign/edit/${vitalSign.id}`}>
                    <Button>Edit</Button>
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
