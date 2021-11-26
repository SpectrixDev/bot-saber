import { BSClient } from "./client/Client";

const start = async () => {
  const client = new BSClient();

  await client.start();
};

start();
