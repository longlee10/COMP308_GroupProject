import { Link } from "react-router-dom";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../components/ui/table";
import { useGetTip } from "@/hooks/useTip";
import { Button } from "./ui/button";

const TipList = () => {
  const { data } = useGetTip();
  const tableHeads = ["Title", "Description", "Actions"];

  return (
    <div>
      <Link to={"/motivation/addTips"}>
        <Button>Create Motivation Tip</Button>
      </Link>
      {data?.dailyTips.length === 0 ? (
        <div className="h-screen flex flex-col justify-center">
          <p className="text-xl m-auto">There is no tip recored.</p>
        </div>
      ) : (
        <>
          <h1 className="text-center text-2xl mt-5">Your Daily Tips</h1>
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
        </>
      )}
    </div>
  );
};

export default TipList;
