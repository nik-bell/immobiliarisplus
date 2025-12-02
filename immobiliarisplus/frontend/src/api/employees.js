import { request } from "./request";

export async function getEmployees() {
  const res = await request("/employees");
  if (res.ok) return res.data;
  console.error("getEmployees ERROR:", res.error || res.status);
  return null;
}
