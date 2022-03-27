import { Button, Center, Group } from "@mantine/core";

import { Link } from "react-router-dom";

export function Header() {
  return (
    <div>
      <Center>
        <Group>
          <Link to="/">
            <Button variant="subtle">Listing</Button>
          </Link>
          <Link to="/create">
            <Button variant="subtle">Create</Button>
          </Link>
          <Link to="/about">
            <Button variant="subtle">About</Button>
          </Link>
        </Group>
      </Center>
    </div>
  );
}
