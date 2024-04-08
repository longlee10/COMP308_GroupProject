import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import useGames, { Game } from "@/generateGames";
import biceps from "../assets/biceps.gif";
import chest from "../assets/chest.gif";
import legs from "../assets/legs.gif";
import back from "../assets/back.gif";
import abs from "../assets/abs.gif";

const Exercises = ({ level }: { level: string }) => {
  const game = useGames();

  return (
    <Carousel className="w-full max-w-xs m-auto mt-5">
      <CarouselContent>
        {game.map((game) => (
          <CarouselItem key={game.Muscles}>
            <div className="p-1">
              <Card>
                <CardTitle className="mt-5">{game.Muscles}</CardTitle>
                <CardContent className="flex flex-col gap-5 aspect-square items-center justify-center p-3">
                  {/* The image biceps.gif in the asset foler */}
                  <img
                    src={decideImage(game)}
                    alt={game.Muscles}
                    className="w-24 h-24"
                  />
                  <div>
                    <span className="text-sm font-semibold">
                      {"Exercise: "}
                    </span>
                    {game.WorkOut}
                  </div>
                  <div>
                    <span className="text-sm font-semibold">
                      {"Set details: "}
                    </span>
                    {game[level]}
                  </div>
                  <div>
                    <span className="text-sm font-semibold">
                      {"Equipment: "}
                    </span>
                    {game.Equipment}
                  </div>
                  <div>
                    {/*  an anchor tag to open blank page */}
                    <a
                      href={game.Video}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500"
                    >
                      {"Watch Video Tutorial"}
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Exercises;

const decideImage = (game: Game) => {
  switch (game.Muscles) {
    case "Biceps":
      return biceps;
    case "Chest":
      return chest;
    case "Legs":
      return legs;
    case "Back":
      return back;
    case "Abs":
      return abs;
    default:
      return biceps;
  }
};
