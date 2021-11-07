import Head from "next/head";
import Image from "next/image";
import {
  Heading,
  Box,
  Container,
  Stack,
  HStack,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";

const hours = 24;
const Activity = () => {
  return (
    <HStack spacing="5px">
      {[...Array(hours)].map((e, i) => (
        <Box key={i} w="8px" h="40px" bg="lightgreen"></Box>
      ))}
    </HStack>
  );
};

export default function Home() {
  return (
    <div className>
      <Head>
        <title>Bridge Monitor</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW="container.md">
        <Stack spacing={4}>
          <Box mt={12} mb={8}>
            <Heading as="h1" size="xl">
              Bridge Monitor
            </Heading>
          </Box>

          <Box borderRadius="lg" borderWidth={"1px"} p="4">
            <StatGroup>
              <Stat>
                <StatLabel>Sent</StatLabel>
                <StatNumber>345,670</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  23.36%
                </StatHelpText>
              </Stat>

              <Stat>
                <StatLabel>Clicked</StatLabel>
                <StatNumber>45</StatNumber>
                <StatHelpText>
                  <StatArrow type="decrease" />
                  9.05%
                </StatHelpText>
              </Stat>
            </StatGroup>
          </Box>
          <Box borderRadius="lg" borderWidth={"1px"} p="4">
            <Heading as="h2" size="sm" mb={2}>
              Activity
            </Heading>
            <Activity />
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
