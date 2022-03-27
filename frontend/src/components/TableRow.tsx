import { Measurement } from "interfaces";
import { DeleteMeasurement } from "./DeleteMeasurement";
import { Badge } from "@mantine/core";

export function TableRow({
  data,
  deleteItem,
}: {
  data: Measurement;
  deleteItem: (id: number) => void;
}) {
  return (
    <tr>
      <td style={{ wordBreak: "break-word" }}>
        {data.name} <Badge color={"indigo"}>{data.code}</Badge>
      </td>
      <td>{data.unit}</td>
      <td>
        {data.referenceValues.lower} / {data.referenceValues.upper}
      </td>
      <td>
        <DeleteMeasurement deleteItem={() => deleteItem(data.id)} />
      </td>
    </tr>
  );
}
