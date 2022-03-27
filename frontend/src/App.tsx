import { AppShell, Center, Header as MantineHeader } from "@mantine/core";
import { Header } from "./components";
import { Outlet } from "react-router";

import styles from "./App.module.css";

function App() {
  return (
    <AppShell
      header={
        <MantineHeader height={60} p={"md"}>
          <Header />
        </MantineHeader>
      }
      padding="md"
    >
      <Center className={styles.App}>
        <Outlet />
      </Center>
    </AppShell>
  );
}

export default App;
