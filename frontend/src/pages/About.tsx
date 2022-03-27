import { List } from "@mantine/core";

export function About() {
  return (
    <div>
      <h1>About</h1>
      <h2>Backend</h2>
      <p>Uses following dependencies:</p>
      <List>
        <List.Item>ExpessJS</List.Item>
        <List.Item>Sequelize</List.Item>
        <List.Item>SQLite</List.Item>
        <List.Item>Mocha</List.Item>
      </List>
      <h2>Frontend</h2>
      <p>Uses following dependencies:</p>
      <List>
        <List.Item>Vite</List.Item>
        <List.Item>TypeScript</List.Item>
        <List.Item>React</List.Item>
        <List.Item>React Router</List.Item>
        <List.Item>Axios</List.Item>
        <List.Item>Mantine</List.Item>
      </List>
      <p>Production build containerized with Docker</p>
    </div>
  );
}
