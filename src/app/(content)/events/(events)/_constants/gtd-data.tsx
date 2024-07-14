import Image from "next/image";
import Link from "next/link";
import { LuX } from "react-icons/lu";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";

import changelingLogo from "@/assets/images/house-changeling-logo.svg?url";
import healerLogo from "@/assets/images/house-healer-logo.svg?url";
import timeturnerLogo from "@/assets/images/house-timeturner-logo.svg?url";
import wandererLogo from "@/assets/images/house-wanderer-logo.svg?url";

const beachDayDresscode = [
  {
    house: "Wanderer",
    logo: wandererLogo,
    color: "Red",
  },
  {
    house: "Changeling",
    logo: changelingLogo,
    color: "Blue",
  },
  {
    house: "Timeturner",
    logo: timeturnerLogo,
    color: "Yellow",
  },
  {
    house: "Healer",
    logo: healerLogo,
    color: "Green",
  },
];

const fieldDayDresscode = [
  {
    house: "Wanderer",
    logo: wandererLogo,
    color: "White",
  },
  {
    house: "Changeling",
    logo: changelingLogo,
    color: "Black",
  },
  {
    house: "Timeturner",
    logo: timeturnerLogo,
    color: "Blue",
  },
  {
    house: "Healer",
    logo: healerLogo,
    color: "Cream/Light Brown",
  },
];

export const gtdData = {
  day1: {
    title: "I: Night Games",
    location: "NTU TR NS/SS",
    date: "Fri, 2 Aug",
    time: "19.15 - 23.45",
    dresscode: "Non-Black T-Shirt",
  },
  day2: {
    title: "II: Beach Day",
    location: (
      <Link
        href="https://maps.app.goo.gl/8vWPP96HLiU9W4jn9"
        target="_blank"
        rel="noreferrer noopener"
        className="underline underline-offset-2 hover:underline-offset-4"
      >
        Siloso Beach
      </Link>
    ),
    date: "Sat, 3 Aug",
    time: "13.40 - 19.00",
    dresscode: (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="underline underline-offset-2 hover:underline-offset-4">
            View Details
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-slate-900 text-white border-slate-800">
          <AlertDialogHeader>
            <div className="flex flex-row items-center gap-4">
              <AlertDialogTitle className="flex-1">
                Beach Day Dresscode
              </AlertDialogTitle>
              <AlertDialogCancel asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="float-end bg-slate-900 hover:bg-zinc-600/50 text-zinc-300 hover:text-zinc-400 border-zinc-600 p-0"
                >
                  <LuX className="size-4" />
                </Button>
              </AlertDialogCancel>
            </div>
            <AlertDialogDescription>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-muted-foreground/25 border-muted-foreground">
                    <TableHead
                      colSpan={2}
                      className="text-zinc-400 text-center sm:text-start"
                    >
                      House
                    </TableHead>
                    <TableHead className="text-zinc-400 text-center sm:text-start">
                      T-Shirt Colour
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {beachDayDresscode.map(({ house, logo, color }) => (
                    <TableRow
                      key={house}
                      className="hover:bg-muted-foreground/25 border-muted-foreground"
                    >
                      <TableCell className="w-[72px] text-end">
                        <Image
                          src={logo}
                          alt={`House ${house} logo`}
                          width={40}
                          className="inline-block"
                        />
                      </TableCell>
                      <TableCell className="text-zinc-50 text-start">
                        {house}
                      </TableCell>
                      <TableCell className="text-zinc-50">{color}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    ),
  },
  day3: {
    title: "III: Field Day",
    location: "All Around SG",
    date: "Sun, 4 Aug",
    time: "12.45 - 18.30",
    dresscode: (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="underline underline-offset-2 hover:underline-offset-4">
            View Details
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-slate-900 text-white border-slate-800">
          <AlertDialogHeader>
            <div className="flex flex-row items-center gap-4">
              <AlertDialogTitle className="flex-1">
                Field Day Dresscode
              </AlertDialogTitle>
              <AlertDialogCancel asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="float-end bg-slate-900 hover:bg-zinc-600/50 text-zinc-300 hover:text-zinc-400 border-zinc-600 p-0"
                >
                  <LuX className="size-4" />
                </Button>
              </AlertDialogCancel>
            </div>
            <AlertDialogDescription>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-muted-foreground/25 border-muted-foreground">
                    <TableHead
                      colSpan={2}
                      className="text-zinc-400 text-center sm:text-start"
                    >
                      House
                    </TableHead>
                    <TableHead className="text-zinc-400 text-center sm:text-start">
                      T-Shirt Colour
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fieldDayDresscode.map(({ house, logo, color }) => (
                    <TableRow
                      key={house}
                      className="hover:bg-muted-foreground/25 border-muted-foreground"
                    >
                      <TableCell className="w-[72px] text-end">
                        <Image
                          src={logo}
                          alt={`House ${house} logo`}
                          width={40}
                          className="inline-block"
                        />
                      </TableCell>
                      <TableCell className="text-zinc-50 text-start">
                        {house}
                      </TableCell>
                      <TableCell className="text-zinc-50">{color}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    ),
  },
  day4: {
    title: "IV: Awards Night",
    location: (
      <Link
        href="https://maps.app.goo.gl/amufCTxfvxkjJqks8"
        target="_blank"
        rel="noreferrer noopener"
        className="underline underline-offset-2 hover:underline-offset-4"
      >
        Metropolitan YMCA
      </Link>
    ),
    date: "Mon, 5 Aug",
    time: "17.00 - 22.00",
    dresscode: "GTD T-Shirt",
  },
};
