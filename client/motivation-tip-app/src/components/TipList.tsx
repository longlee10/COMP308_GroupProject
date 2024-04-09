import { Link } from "react-router-dom";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../components/ui/table";
import { useGetTip } from "@/useTip";
import { Button } from "./ui/button";

const TipList = () => {
  const { data } = useGetTip();
  const tableHeads = ["TITLE", "DESCRIPTION", "ACTIONS"];

  return (
    <div>
      <p className="text-center text-2xl font-bold mt-5">Daily Tips!</p>
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
          {data?.dailyTips &&
            data?.dailyTips.map((tip) => (
              <TableRow key={tip.id}>
                <TableCell>{tip.title}</TableCell>
                <TableCell>{tip.description}</TableCell>
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

export default TipList;
