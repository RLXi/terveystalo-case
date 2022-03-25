import { Button } from "@mantine/core";
import { FaTrash } from "react-icons/fa";

export function DeleteMeasurement({ deleteItem }: { deleteItem: () => void }) {
  return (
    <Button variant="subtle" color={"red"} onClick={deleteItem}>
      <FaTrash />
    </Button>
  );
}
