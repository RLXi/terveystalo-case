import { Measurement } from "interfaces";

import { DeleteMeasurement } from "./DeleteMeasurement";

export function Item({
  data,
  deleteItem,
}: {
  data: Measurement;
  deleteItem: (id: number) => void;
}) {
  return (
    <li>
      {data.name} ({data.unit}), {data.referenceValues.lower}/
      {data.referenceValues.upper}
      <DeleteMeasurement deleteItem={() => deleteItem(data.id)} />
    </li>
  );
}
