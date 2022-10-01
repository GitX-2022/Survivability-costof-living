import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import { Button } from "@chakra-ui/react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import MainLayout from "../MainLayout";
import Card from "@mui/material/Card";
import { ChakraProvider } from "@chakra-ui/react";
import Options from "../../components/Options";

export default function Home() {
  const [timeHotel, setTimeHotel] = React.useState(0);
  const [non_veg, set_non_veg] = React.useState(0);
  const [modeOfTransport, setModeOfTransport] = React.useState("Own Vehicle");
  const [distTravel, setDistTravel] = React.useState(0);
  const [familySize, setFamilySize] = React.useState(0);
  const [noOfChildren, setNoOfChildren] = React.useState(0);
  const [typeOfHouse, setTypeOfHouse] = React.useState(
    "1 BHK in the City Centre"
  );
  const [isCigar, setIsCigar] = React.useState(false);
  const [isAlcohol, setIsAlcohol] = React.useState(false);

  return (
    <MainLayout>
      <Options />
    </MainLayout>
  );
}
