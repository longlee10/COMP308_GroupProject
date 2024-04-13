import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetVitalSigns, useDeleteVitalSign } from "@/hooks/useVitalSign";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import Spinner from "./Spinner";

const VitalSign = () => {
  const { loading, error, data: vitalSignsData, refetch } = useGetVitalSigns();
  const handleDelete = useDeleteVitalSign();

  const tableHeads = [
    "Temperature",
    "Blood Pressure",
    "Heart Rate",
    "Respiratory Rate",
    "Oxygen Saturation",
    "Patient",
    "Action",
  ];

  if (loading)
    return (
      <div className="h-screen flex flex-col justify-center">
        <Spinner />
      </div>
    );
  if (error)
    return (
      <div className="h-screen flex flex-col justify-center gap-5 items-center">
        <p>An unexpected error occurred.</p>
        <Button onClick={() => refetch()}>Try Again</Button>
        OR
        <Link to="/">
          <Button>Go to Hompage</Button>
        </Link>
      </div>
    );

  return (
    <div>
      <Link to="/vital-sign/addVitalSign">
        <Button> Add Vital Sign </Button>
      </Link>

      {vitalSignsData?.vitalSigns.length === 0 ? (
        <div className="h-screen flex flex-col justify-center">
          <p className="text-xl m-auto">There is no vital sign recorded.</p>
        </div>
      ) : (
        <>
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
                      <Button
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => {
                          handleDelete(vitalSign.id);
                          refetch();
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};

export default VitalSign;
