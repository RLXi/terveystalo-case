import { Drawer, Button, Table, Center, Skeleton, Loader } from "@mantine/core";
import { Measurement } from "../interfaces";
import { useState } from "react";
import { MdScience } from "react-icons/md";
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
  const { data, loading, deleteItem, setReload } = useData();
  const [opened, setOpened] = useState(false);

  if (loading) return <Loader />;

  return (
    <div>
      <MeasurementTable data={data} deleteItem={deleteItem} />
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create new measurement"
        padding="xl"
        size="xl"
        position="right"
      >
        <CreateMeasurement
          closeDrawer={() => {
            setOpened(false);
            setReload(true);
          }}
        />
      </Drawer>
      <Center>
        <Button onClick={() => setOpened((prev) => !prev)}>
          <MdScience />
          Create new
        </Button>
      </Center>
    </div>
  );
}
