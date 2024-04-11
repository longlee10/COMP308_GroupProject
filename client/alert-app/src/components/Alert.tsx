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
import { useGetAlerts } from "@/hooks/useAlert";

const Alert = () => {
  const tableHeads = [
    "PATIENT NAME",
    "RESPONDER NAME",
    "RESPONDER PHONE",
    "RESPONDER ADDRESS",
    "MESSAGE",
    "ACTIONS",
  ];
  const { data } = useGetAlerts();

  return (
    <div>
      <Link to={"/alert/add"}>
        <Button>Create Alert</Button>
      </Link>
      <p className="text-center text-2xl font-bold mt-5">Alert List</p>
      <Table className="w-3/5 m-auto mt-5">
        <TableHeader>
          <TableRow>
            {tableHeads.map((head) => (
              <TableHead
                key={head}
                className="text-center font-bold text-black text-lg"
              >
                {head}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.alerts &&
            data?.alerts.map((tip) => (
              <TableRow key={tip.id}>
                <TableCell>{tip.patientName}</TableCell>
                <TableCell>{tip.responderName}</TableCell>
                <TableCell>{tip.responderPhone}</TableCell>
                <TableCell>{tip.responderAddress}</TableCell>
                <TableCell>{tip.message}</TableCell>
                <TableCell className="flex gap-3">
                  <Link to={``}>
                    <Button>Edit</Button>
                  </Link>
                  <Button className="bg-red-500 hover:bg-red-600">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Alert;
