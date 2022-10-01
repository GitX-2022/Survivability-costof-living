import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import Typography from "@mui/material/Typography";
import { Container, Stack, StepLabel } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import { Select } from "@chakra-ui/react";
import axios from "axios";

export default function Options() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [income, setIncome] = React.useState("");
  const [toSave, setToSave] = React.useState("");
  const [timeHotel, setTimeHotel] = React.useState("");
  const [isNonVeg, set_isNonVeg] = React.useState("");
  const [modeOfTransport, setModeOfTransport] = React.useState("0");
  const [distTravel, setDistTravel] = React.useState("");
  const [familySize, setFamilySize] = React.useState("");
  const [noOfChild, setNoOfChild] = React.useState("");
  const [typeOfHouse, setTypeOfHouse] = React.useState("1");
  const nextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  let axiosConfig = {
    origin: "http://127.0.0.1:5000/",
  };

  const prevStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const finish = async () => {
    await axios
      .post(
        "http://127.0.0.1:5000/",
        {
          income: income,
          toSave: toSave,
          timeHotel: timeHotel,
          isNonVeg: isNonVeg,
          modeOfTransport: modeOfTransport,
          distTravel: distTravel,
          familySize: familySize,
          noOfChild: noOfChild,
          typeOfHouse: typeOfHouse,
        },
        axiosConfig
      )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container sx={{ width: "80%" }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>Monthly Income</StepLabel>
          <StepContent>
            <Stack gap={2}>
              <Typography variant="h6" component="div">
                How much do you earn per month?
              </Typography>
              <ChakraProvider>
                <Input
                  variant="filled"
                  value={income}
                  placeholder="Your answer here"
                  onChange={(i) => {
                    // only if i.target.value is a number set it to saving else dont set it
                    if (!isNaN(i.target.value)) {
                      setIncome(i.target.value);
                    }
                  }}
                />
                <Stack direction="row" gap={1.5}>
                  <Button colorScheme="blue" onClick={nextStep}>
                    Next
                  </Button>
                </Stack>
              </ChakraProvider>
            </Stack>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Savings amount</StepLabel>
          <StepContent>
            <Stack gap={2}>
              <Typography variant="h6" component="div">
                How much do you save per month?
              </Typography>
              <ChakraProvider>
                <Input
                  variant="filled"
                  value={toSave}
                  placeholder="Your answer here"
                  onChange={(i) => {
                    // only if i.target.value is a number set it to saving else dont set it
                    if (!isNaN(i.target.value)) {
                      setToSave(i.target.value);
                    }
                  }}
                />
                <Stack direction="row" gap={1.5}>
                  <Button colorScheme="blue" onClick={nextStep}>
                    Next
                  </Button>
                  <Button onClick={prevStep}>Back</Button>
                </Stack>
              </ChakraProvider>
            </Stack>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Time spent in Hotel</StepLabel>
          <StepContent>
            <Stack gap={2}>
              <Typography variant="h6" component="div">
                On an average, how many times do you eat out in a restaurant?
              </Typography>
              <ChakraProvider>
                <Input
                  variant="filled"
                  value={timeHotel}
                  placeholder="Your answer here"
                  onChange={(i) => {
                    // only if i.target.value is a number set it to saving else dont set it
                    if (!isNaN(i.target.value)) {
                      setTimeHotel(i.target.value);
                    }
                  }}
                />
                <Stack direction="row" gap={1.5}>
                  <Button colorScheme="blue" onClick={nextStep}>
                    Next
                  </Button>
                  <Button onClick={prevStep}>Back</Button>
                </Stack>
              </ChakraProvider>
            </Stack>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Food preference</StepLabel>
          <StepContent>
            <Stack gap={2}>
              <Typography variant="h6" component="div">
                How many times are you likely to eat Non-vegetarian food in a
                month?
              </Typography>
              <ChakraProvider>
                <Input
                  variant="filled"
                  value={isNonVeg}
                  placeholder="Your answer here"
                  onChange={(i) => {
                    // only if i.target.value is a number set it to saving else dont set it
                    if (!isNaN(i.target.value)) {
                      set_isNonVeg(i.target.value);
                    }
                  }}
                />
                <Stack direction="row" gap={1.5}>
                  <Button colorScheme="blue" onClick={nextStep}>
                    Next
                  </Button>
                  <Button onClick={prevStep}>Back</Button>
                </Stack>
              </ChakraProvider>
            </Stack>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Travel preference</StepLabel>
          <StepContent>
            <Stack gap={2}>
              <Typography variant="h6" component="div">
                Which Mode of transport are you likely to use the most?
              </Typography>
              <ChakraProvider>
                <Select
                  value={modeOfTransport}
                  onChange={(i) => {
                    setModeOfTransport(i.target.value);
                  }}
                >
                  <option value="0">Own Vehicle</option>
                  <option value="1">Taxi</option>
                  <option value="2">Public Transport</option>
                </Select>
                <Stack direction="row" gap={1.5}>
                  <Button colorScheme="blue" onClick={nextStep}>
                    Next
                  </Button>
                  <Button onClick={prevStep}>Back</Button>
                </Stack>
              </ChakraProvider>
            </Stack>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Travel distance</StepLabel>
          <StepContent>
            <Stack gap={2}>
              <Typography variant="h6" component="div">
                How many kilometers, on average, are you likely to travel a
                month?
              </Typography>
              <ChakraProvider>
                <Input
                  variant="filled"
                  value={distTravel}
                  placeholder="Your answer here"
                  onChange={(i) => {
                    // only if i.target.value is a number set it to saving else dont set it
                    if (!isNaN(i.target.value)) {
                      setDistTravel(i.target.value);
                    }
                  }}
                />
                <Stack direction="row" gap={1.5}>
                  <Button colorScheme="blue" onClick={nextStep}>
                    Next
                  </Button>
                  <Button onClick={prevStep}>Back</Button>
                </Stack>
              </ChakraProvider>
            </Stack>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Family Size</StepLabel>
          <StepContent>
            <Stack gap={2}>
              <Typography variant="h6" component="div">
                How many members are there in your family?
              </Typography>
              <ChakraProvider>
                <Input
                  variant="filled"
                  value={familySize}
                  placeholder="Your answer here"
                  onChange={(i) => {
                    // only if i.target.value is a number set it to saving else dont set it
                    if (!isNaN(i.target.value)) {
                      setFamilySize(i.target.value);
                    }
                  }}
                />
                <Stack direction="row" gap={1.5}>
                  <Button colorScheme="blue" onClick={nextStep}>
                    Next
                  </Button>
                  <Button onClick={prevStep}>Back</Button>
                </Stack>
              </ChakraProvider>
            </Stack>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Number of kids (If any)</StepLabel>
          <StepContent>
            <Stack gap={2}>
              <Typography variant="h6" component="div">
                How many kids do you have?
              </Typography>
              <ChakraProvider>
                <Input
                  variant="filled"
                  value={noOfChild}
                  placeholder="Your answer here"
                  onChange={(i) => {
                    // only if i.target.value is a number set it to saving else dont set it
                    if (!isNaN(i.target.value)) {
                      setNoOfChild(i.target.value);
                    }
                  }}
                />
                <Stack direction="row" gap={1.5}>
                  <Button colorScheme="blue" onClick={nextStep}>
                    Next
                  </Button>
                  <Button onClick={prevStep}>Back</Button>
                </Stack>
              </ChakraProvider>
            </Stack>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Type of House</StepLabel>
          <StepContent>
            <Stack gap={2}>
              <Typography variant="h6" component="div">
                What type of house do you live in?
              </Typography>
              <ChakraProvider>
                <Select
                  value={typeOfHouse}
                  onChange={(i) => {
                    setTypeOfHouse(i.target.value);
                  }}
                >
                  <option value="1">1 BHK in the City Centre</option>
                  <option value="2">1 BHK in the Outskirts</option>
                  <option value="3">3 BHK in the City Centre</option>
                  <option value="4">3 BHK in the Outskirts</option>
                </Select>
                <Stack direction="row" gap={1.5}>
                  <Button colorScheme="blue" onClick={finish}>
                    Finish
                  </Button>
                  <Button onClick={prevStep}>Back</Button>
                </Stack>
              </ChakraProvider>
            </Stack>
          </StepContent>
        </Step>
      </Stepper>
    </Container>
  );
}
