import { useState } from "react";
import { AppShell } from "@mantine/core";
import { Header } from "./components";
import { Outlet } from "react-router";

import styles from "./App.module.css";

function App() {
  return (
    <AppShell header={<Header />} padding="md">
      <Outlet />
    </AppShell>
  );
}

export default App;
