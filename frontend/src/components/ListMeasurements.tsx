import { Drawer, Button, Table, Center } from "@mantine/core";
import { Measurement } from "../interfaces";
import { useState } from "react";
import { useData } from "../hooks";
import { CreateMeasurement, TableRow } from "./";

function MeasurementTable({
  data,
  deleteItem,
}: {
  data: Measurement[];
  deleteItem: (id: number) => void;
}) {
  return (
    <Table style={{ width: "50vw" }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Unit</th>
          <th>Reference values</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <TableRow key={item.id} data={item} deleteItem={deleteItem} />
        ))}
      </tbody>
    </Table>
  );
}

export function ListMeasurements() {
  const { data, deleteItem } = useData();
  const [opened, setOpened] = useState(false);
  if (data.length === 0) return null;

  return (
    <div>
      <MeasurementTable data={data} deleteItem={deleteItem} />
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create"
        padding="xl"
        size="xl"
      >
        <CreateMeasurement closeDrawer={() => setOpened(false)} />
      </Drawer>
      <Center>
        <Button onClick={() => setOpened((prev) => !prev)}>Create new</Button>
      </Center>
    </div>
  );
}
