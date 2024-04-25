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
import { useState, useEffect } from "react";
import { VitalSign } from "../entities/types";

type User = {
  username: string;
  role: "patient" | "nurse";
};

const VitalSigns = () => {
  const { loading, error, data: vitalSignsData, refetch } = useGetVitalSigns();
  const handleDelete = useDeleteVitalSign();
  const user: User = JSON.parse(localStorage.getItem("user")!);
  const [filteredVitalSigns, setFilteredVitalSigns] = useState<VitalSign[]>([]);

  const tableHeads = [
    "Temperature",
    "Blood Pressure",
    "Heart Rate",
    "Respiratory Rate",
    "Oxygen Saturation",
    "Patient",
    "Has Disease?",
    "Predict Disease",
    "Action",
  ];

  // filter vital sign to get only the vital sign of the logged in patient,
  // by comparing the username of the patient in the vital sign with the username of the logged in patient
  // render all vital signs if the user is a nurse
  useEffect(() => {
    if (vitalSignsData) {
      const filteredData = vitalSignsData.vitalSigns.filter((vitalSign) =>
        user?.role === "patient"
          ? vitalSign.patient?.username === user.username
          : vitalSign
      );
      setFilteredVitalSigns(filteredData);
    }
  }, [vitalSignsData]);

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

      {filteredVitalSigns.length === 0 ? (
        <div className="h-screen flex flex-col justify-center">
          <p className="text-xl m-auto">There is no vital sign recorded.</p>
        </div>
      ) : (
        <>
          <Table className="w-3/5 m-auto mt-5">
            <TableHeader>
              <TableRow>
                {tableHeads
                  .filter(
                    (head) =>
                      !(head === "Predict Disease" && user?.role !== "nurse")
                  )
                  .map((head) => (
                    <TableHead key={head} className="text-center">
                      {head}
                    </TableHead>
                  ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVitalSigns.map((vitalSign) => (
                <TableRow key={vitalSign.id}>
                  <TableCell>{vitalSign.temperature}</TableCell>
                  <TableCell>{vitalSign.bloodPressure}</TableCell>
                  <TableCell>{vitalSign.heartRate}</TableCell>
                  <TableCell>{vitalSign.respiratoryRate}</TableCell>
                  <TableCell>{vitalSign.oxygenSaturation}</TableCell>
                  <TableCell>{vitalSign.patient?.username}</TableCell>
                  <TableCell
                    className={
                      vitalSign.disease ? "text-red-500 font-bold" : "font-bold"
                    }
                  >
                    {vitalSign.disease === true
                      ? "Yes"
                      : vitalSign.disease === false
                      ? "No"
                      : "No record"}
                  </TableCell>
                  {/* Display predict disease button only when user is in local storage */}
                  {user && user.role === "nurse" && (
                    <TableCell>
                      <Link to={`/vital-sign/predictDisease/${vitalSign.id}`}>
                        <Button>
                          {vitalSign.disease === null
                            ? "Predict"
                            : "Predict Again"}
                        </Button>
                      </Link>
                    </TableCell>
                  )}
                  <TableCell className="flex gap-3">
                    <Link to={`/vital-sign/edit/${vitalSign.id}`}>
                      <Button>Edit</Button>
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

export default VitalSigns;
