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
import { useGetCheckList } from "@/useCheckList";

const Symptoms = () => {
  const { data, loading, error } = useGetCheckList();
  const tableHeads = ["Patient Name", "Symptoms", "Action"];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Link to="/symptom/addSymptom">
        <Button> Add Symptom </Button>
      </Link>

      {data?.checklists.length === 0 ? (
        <div className="h-screen flex flex-col justify-center">
          <p className="text-xl m-auto">There is no symptom recorded.</p>
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
              {data?.checklists &&
                data?.checklists.map((checkList) => (
                  <TableRow key={checkList.id}>
                    <TableCell>{checkList.patientName}</TableCell>
                    <TableCell>
                      {checkList.selectedSymptoms.join(", ")}
                    </TableCell>
                    <TableCell>
                      <Link to={`/symptom/edit/${checkList.id}`}>
                        <Button>Edit</Button>
                      </Link>
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

export default Symptoms;
