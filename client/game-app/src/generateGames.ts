import biceps from "./data/biceps.json";
import chest from "./data/chest.json";
import legs from "./data/legs.json";
import back from "./data/back.json";
import abs from "./data/abs.json";

import { useState, useEffect } from "react";

export interface Game {
  Muscles: string;
  WorkOut: string;
  Intensity_Level: string;
  "Beginner Sets": string;
  "Intermediate Sets": string;
  "Expert Sets": string;
  Equipment: string;
  Explaination: string;
  Video: string;
  [key: string]: string;
}

const useGames = () => {
  const [bicep_ex, setBicep_Ex] = useState<Game>({} as Game);
  const [chest_ex, setChest_Ex] = useState<Game>({} as Game);
  const [leg_ex, setLeg_Ex] = useState<Game>({} as Game);
  const [back_ex, setBack_Ex] = useState<Game>({} as Game);
  const [abs_ex, setAbs_Ex] = useState<Game>({} as Game);

  useEffect(() => {
    setBicep_Ex(biceps[generateRandomNumber(biceps.length)]);
    setChest_Ex(chest[generateRandomNumber(chest.length)]);
    setLeg_Ex(legs[generateRandomNumber(legs.length)]);
    setBack_Ex(back[generateRandomNumber(back.length)]);
    setAbs_Ex(abs[generateRandomNumber(abs.length)]);
  }, []);

  return [bicep_ex, chest_ex, leg_ex, back_ex, abs_ex];
};

export default useGames;

const generateRandomNumber = (max: number) => {
  return Math.floor(Math.random() * max);
};
