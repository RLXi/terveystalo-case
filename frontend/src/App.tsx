import { AppShell } from "@mantine/core";

import { CreateMeasurement, ListMeasurements } from "./components";

import styles from "./App.module.css";

function App() {
  return (
    <AppShell padding="md">
      <ListMeasurements />
      <CreateMeasurement />
    </AppShell>
  );
}

export default App;
