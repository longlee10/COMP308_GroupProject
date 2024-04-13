
import { useGetSymptoms } from "@/hooks/useSymptom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Symptom = () => {
  const { loading, error, data } = useGetSymptoms();
  const tableHeads = [
    "Patient Name",
    "Symptoms",
    "Action",
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>

      <div>
        
      <Link to="/symptom/addSymptom">
        <Button> Add Symptom checklist </Button>
      </Link>
      </div>

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
          {data?.checklists &&
            data?.checklists.map((checklist) => (
              <TableRow key={checklist.id}>
                <TableCell>{checklist.patientName}</TableCell>
                <TableCell>{checklist.selectedSymptoms.join(", ")}</TableCell>
                <TableCell>
                  <Link to={`/symptom/edit/${checklist.id}`}>
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

export default Symptom;
