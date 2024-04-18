import { Link } from "react-router-dom";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../components/ui/table";
import { useGetTip, useDeleteTip } from "@/hooks/useTip";
import { Button } from "./ui/button";
import Spinner from "./Spinner";

const TipList = () => {
  const { data, refetch, loading, error } = useGetTip();
  const deleteTip = useDeleteTip();

  const tableHeads = ["Title", "Description", "Actions"];

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
                      <Link to={`/motivation/edit/${tip.id}`}>
                        <Button>Edit</Button>
                      </Link>
                      <Button
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => {
                          deleteTip(tip.id);
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

export default TipList;
