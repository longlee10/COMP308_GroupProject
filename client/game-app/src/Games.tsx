import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import Exercises from "./components/Exercises";

const Games = () => {
  const [level, setLevel] = useState<string>("");

  return (
    <div className="m-auto w-1/2">
      <Select defaultValue={level} onValueChange={(e) => setLevel(e)}>
        <SelectTrigger className="w-[180px] m-auto mt-0 mb-0">
          <SelectValue placeholder="Select your level" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Levels</SelectLabel>
            <SelectItem value="Beginner Sets">Beginner</SelectItem>
            <SelectItem value="Intermediate Sets">Intermediate</SelectItem>
            <SelectItem value="Expert Sets">Expert</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {level ? (
        <Exercises level={level} />
      ) : (
        <p className="mt-5 text-lg">
          Please select your level to start training!
        </p>
      )}
    </div>
  );
};

export default Games;
