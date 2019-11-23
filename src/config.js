const hostname = window.location.hostname;
const hostnameWithPort =
  hostname === "localhost" ? `${hostname}:8000` : hostname;
export const baseURL = `${window.location.protocol}//${hostnameWithPort}`;
