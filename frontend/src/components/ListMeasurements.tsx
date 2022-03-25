import { useData } from "../hooks";
import { Item } from "./";

export function ListMeasurements() {
  const { data, deleteItem } = useData();

  if (data.length === 0) return null;

  return (
    <div>
      <ul>
        {data.map((item) => (
          <Item key={item.id} data={item} deleteItem={deleteItem} />
        ))}
      </ul>
    </div>
  );
}
