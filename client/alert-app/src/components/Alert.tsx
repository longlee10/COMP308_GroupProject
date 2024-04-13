import { Link } from "react-router-dom";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "./ui/table";
import { Button } from "./ui/button";
import { useGetAlerts, useDeleteAlert } from "@/hooks/useAlert";
import Spinner from "./Spinner";

const Alert = () => {
  const tableHeads = [
    "Patient Name",
    "Responder Name",
    "Responder Phone",
    "Responder Address",
    "Message",
    "Actions",
  ];

  const { data, refetch, error, loading } = useGetAlerts();
  const deleteAlert = useDeleteAlert();

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
      <Link to={"/alert/add"}>
        <Button>Create Alert</Button>
      </Link>
      {data?.alerts.length === 0 ? (
        <div className="h-screen flex flex-col justify-center">
          <p className="text-xl m-auto">There is no alert recorded.</p>
        </div>
      ) : (
        <>
          <p className="text-center text-2xl font-bold mt-5">Alert List</p>
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
              {data?.alerts &&
                data?.alerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell>{alert.patientName}</TableCell>
                    <TableCell>{alert.responderName}</TableCell>
                    <TableCell>{alert.responderPhone}</TableCell>
                    <TableCell>{alert.responderAddress}</TableCell>
                    <TableCell>{alert.message}</TableCell>
                    <TableCell className="flex gap-3">
                      <Link to={`/alert/edit/${alert.id}`}>
                        <Button>Edit</Button>
                      </Link>
                      <Button
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => {
                          deleteAlert(alert.id);
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

export default Alert;
