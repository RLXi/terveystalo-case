import { AppShell } from "@mantine/core";
import { Header } from "./components";
import { Outlet } from "react-router";

function App() {
  return (
    <AppShell header={<Header />} padding="md">
      <Outlet />
    </AppShell>
  );
}

export default App;
