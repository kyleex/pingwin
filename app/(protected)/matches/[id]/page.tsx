"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { getMatchDetailById } from "@/data/match";
import { useSession } from "next-auth/react";
import Header from "@/components/layout/header";
import FooterNavigation from "@/components/layout/footer-nav";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MatchDetailPage = () => {
  const session = useSession();
  const pathname = usePathname();
  const matchId = pathname.split("/").pop() || ""; // Ensure matchId is always defined

  const [match, setMatch] = useState<{
    id: number;
    player1: string;
    player2: string;
    score: string;
    winner: string;
    userId: string;
    createdAt: Date;
  } | null>(null); // Provide a default value for match

  useEffect(() => {
    const fetchMatchDetail = async () => {
      const matchDetail = await getMatchDetailById(Number(matchId));

      setMatch(matchDetail);
    };

    fetchMatchDetail();
  }, [matchId]);

  return (
    <>
      <main className="flex flex-col grow overflow-auto md:max-w-md lg:max-w-md xl:max-w-md px-6 h-fit">
        <span className="flex flex-row items-center my-5">
          <Link href="/matches" className="relative grow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-chevron-left"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Link>
          <h1 className="flex grow">Match detail</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            color="#000000"
            fill="none"
          >
            <path
              d="M11.9959 12H12.0049"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M17.9998 12H18.0088"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.99981 12H6.00879"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>

        <Card>
          <CardHeader className="flex flex-row items-center gap-x-3">
            <img
              src="/icon-table-tennis.svg"
              alt="table tennis icon"
              className="w-7 h-7"
            />
            <p>Amical</p>
          </CardHeader>
          <CardContent className="flex flex-row justify-between px-14 items-center">
            <span className="flex flex-col items-center">
              <Avatar className="h-14 w-14">
                <AvatarImage src="" className="bg-gray-100" />
                <AvatarFallback className="uppercase">
                  {match?.player1.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <p className="capitalize text-lg">{match?.player1}</p>
              <p className="font-light text-s">920 pts</p>
            </span>
            <span className="flex flex-col items-center gap-y-2">
              <p className="text-xl font-semibold tracking-wider">
                <span
                  className={`${
                    match?.winner == session.data?.user.name
                      ? "text-dark-sea-green"
                      : "text-fire-opal"
                  } mr-2`}
                >
                  {match?.score.substring(0, 1)}
                </span>
                {match?.score.substring(1, 2)}
                <span
                  className={`${
                    match?.winner != session.data?.user.name
                      ? "text-dark-sea-green"
                      : "text-fire-opal"
                  } ml-2`}
                >
                  {match?.score.substring(2, 3)}
                </span>
              </p>
              <p className="bg-white border-[#CBB252] border text-[#CBB252] rounded-full px-2 py-1 text-s font-thin">
                Finished
              </p>
            </span>
            <span className="flex flex-col items-center">
              <Avatar className="h-14 w-14">
                <AvatarImage src="" className="bg-gray-100" />
                <AvatarFallback className="uppercase">
                  {match?.player2.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <p className="capitalize text-lg">{match?.player2}</p>
              <p className="font-light text-s">903 pts</p>
            </span>
            {/* <p>Created at: {match?.createdAt}</p> */}
          </CardContent>
          <CardFooter>
            <span>
              <Link href={`/matches/${matchId}/edit`} className="btn">
                Edit
              </Link>
            </span>
          </CardFooter>
        </Card>

        <Card className="my-5">
          <CardHeader>
            <Tabs defaultValue="game-details" className="w-fit text-base">
              <TabsList className="bg-transparent">
                <TabsTrigger
                  value="game-details"
                  className="rounded-full mr-4 data-[state=active]:bg-primary"
                >
                  Game details
                </TabsTrigger>
                <TabsTrigger
                  value="Stats"
                  className="rounded-full mr-4 data-[state=active]:bg-primary"
                >
                  Stats
                </TabsTrigger>
              </TabsList>
              <TabsContent value="game-details" className="flex flex-col mx-2">
                <h2 className="text-lg font-bold mt-5 mb-2">Informations</h2>
                <div className="flex flex-col gap-y-2 text-s">
                  {/* Match date */}
                  <span className="flex flex-row gap-x-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      color="#000000"
                      fill="none"
                    >
                      <path
                        d="M18 2V4M6 2V4"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10 17L9.99999 13.3472C9.99999 13.1555 9.86325 13 9.69458 13H9M13.6297 17L14.9842 13.3492C15.0475 13.1785 14.9128 13 14.7207 13H13"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M6 8H18"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>{match?.createdAt.toDateString()}</p>
                  </span>

                  {/* Match time */}
                  <span className="flex flex-row gap-x-2 items-center">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      color="#000000"
                      fill="none"
                    >
                      <path
                        d="M18.952 8.60657L21.4622 8.45376C19.6629 3.70477 14.497 0.999914 9.4604 2.34474C4.09599 3.77711 0.909631 9.26107 2.34347 14.5935C3.77731 19.926 9.28839 23.0876 14.6528 21.6553C18.6358 20.5917 21.4181 17.2946 22 13.4844"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 8V12L14 14"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>22 min</p>
                  </span>

                  <span className="flex flex-row gap-x-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      color="#000000"
                      fill="none"
                    >
                      <path
                        d="M18.6161 20H19.1063C20.2561 20 21.1707 19.4761 21.9919 18.7436C24.078 16.8826 19.1741 15 17.5 15M15.5 5.06877C15.7271 5.02373 15.9629 5 16.2048 5C18.0247 5 19.5 6.34315 19.5 8C19.5 9.65685 18.0247 11 16.2048 11C15.9629 11 15.7271 10.9763 15.5 10.9312"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M4.48131 16.1112C3.30234 16.743 0.211137 18.0331 2.09388 19.6474C3.01359 20.436 4.03791 21 5.32572 21H12.6743C13.9621 21 14.9864 20.436 15.9061 19.6474C17.7889 18.0331 14.6977 16.743 13.5187 16.1112C10.754 14.6296 7.24599 14.6296 4.48131 16.1112Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                      />
                      <path
                        d="M13 7.5C13 9.70914 11.2091 11.5 9 11.5C6.79086 11.5 5 9.70914 5 7.5C5 5.29086 6.79086 3.5 9 3.5C11.2091 3.5 13 5.29086 13 7.5Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                      />
                    </svg>
                    <p>Single</p>
                  </span>

                  {/* Match location */}
                  <span className="flex flex-row gap-x-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      color="#000000"
                      fill="none"
                    >
                      <path
                        d="M18 18C19.2447 18.4244 20 18.9819 20 19.5925C20 20.9221 16.4183 22 12 22C7.58172 22 4 20.9221 4 19.5925C4 18.9819 4.75527 18.4244 6 18"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M15 9.5C15 11.1569 13.6569 12.5 12 12.5C10.3431 12.5 9 11.1569 9 9.5C9 7.84315 10.3431 6.5 12 6.5C13.6569 6.5 15 7.84315 15 9.5Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                      />
                      <path
                        d="M12 2C16.0588 2 19.5 5.42803 19.5 9.5869C19.5 13.812 16.0028 16.777 12.7725 18.7932C12.5371 18.9287 12.2709 19 12 19C11.7291 19 11.4629 18.9287 11.2275 18.7932C8.00325 16.7573 4.5 13.8266 4.5 9.5869C4.5 5.42803 7.9412 2 12 2Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                      />
                    </svg>
                    <p>Montpellier</p>
                  </span>

                  {/* Country match played */}
                  <span className="flex flex-row gap-x-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      color="#000000"
                      fill="none"
                    >
                      <path
                        d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                      />
                      <path
                        d="M20 5.69899C19.0653 5.76636 17.8681 6.12824 17.0379 7.20277C15.5385 9.14361 14.039 9.30556 13.0394 8.65861C11.5399 7.6882 12.8 6.11636 11.0401 5.26215C9.89313 4.70542 9.73321 3.19045 10.3716 2"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M2 11C2.7625 11.6621 3.83046 12.2682 5.08874 12.2682C7.68843 12.2682 8.20837 12.7649 8.20837 14.7518C8.20837 16.7387 8.20837 16.7387 8.72831 18.2288C9.06651 19.1981 9.18472 20.1674 8.5106 21"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M22 13.4523C21.1129 12.9411 20 12.7308 18.8734 13.5405C16.7177 15.0898 15.2314 13.806 14.5619 15.0889C13.5765 16.9775 17.0957 17.5711 14 22"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p>France</p>
                  </span>
                </div>
                <h2 className="text-lg font-bold mt-5 mb-2">Score</h2>
                <div>
                  <table className="border-separate border-spacing-x-2">
                    <tbody>
                      <tr>
                        <td
                          className={`${
                            match?.winner == session.data?.user.name
                              ? "text-black"
                              : "text-[b0b0b0]"
                          }`}
                        >
                          {match?.player1} WILLIAMS
                        </td>
                        <td className="text-black bg-[#f8f9fa] px-2">11</td>
                        <td className="text-[#b0b0b0] bg-[#f8f9fa] px-2">07</td>
                        <td className="text-black bg-[#f8f9fa] px-2">12</td>
                        <td className="text-black bg-[#f8f9fa] px-2">11</td>
                      </tr>
                      <tr>
                        <td
                          className={`${
                            match?.winner == match?.player2
                              ? "text-black"
                              : "text-[#b0b0b0]"
                          }`}
                        >
                          {match?.player2} SMITH{" "}
                        </td>
                        <td className="text-[#b0b0b0] bg-[#f8f9fa] px-2">09</td>
                        <td className="text-black bg-[#f8f9fa] px-2">11</td>
                        <td className="text-[#b0b0b0] bg-[#f8f9fa] px-2">10</td>
                        <td className="text-[#b0b0b0] bg-[#f8f9fa] px-2">07</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              <TabsContent value="stats">Stats here</TabsContent>
            </Tabs>
          </CardHeader>
        </Card>

        {/* <p>Match ID: {matchId}</p> */}
        {/* <p className="flex flex-wrap w-[5px]">Match: {JSON.stringify(match)}</p> */}
        {/* <p>Player 1: {match?.player1}</p>
        <p>Player 2: {match?.player2}</p>
        <p>Score: {match?.score}</p>
        <p>Winner: {match?.winner}</p> */}
      </main>
      <footer className="bottom-0 w-full  ">
        <FooterNavigation />
      </footer>
    </>
  );
};

export default MatchDetailPage;
