import { Center, Group } from "@mantine/core";

import { Link } from "react-router-dom";

export function Header() {
  return (
    <div>
      <Center>
        <Group>
          <Link to="/">Listing</Link>
          <Link to="/create">Create</Link>
          <Link to="/about">About</Link>
        </Group>
      </Center>
    </div>
  );
}
