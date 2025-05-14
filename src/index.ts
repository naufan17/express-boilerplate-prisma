import app from "./app/app";
import config from "./app/config/config";

const environment: string = config.NodeEnv;
const port: number = Number(config.Port);
const host: string = config.Host;

console.log(`[server] Server is running on environment: ${environment}`);

app.listen(port, () => {
  console.log(`[server] Server is running on http://${host}:${port}`);
});