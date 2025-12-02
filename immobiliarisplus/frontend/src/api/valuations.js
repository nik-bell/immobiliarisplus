import { request } from "./request";

export async function getValuationsDashboard() {
  const res = await request("/valuations/dashboard");
  if (res.ok) return res.data;
  console.error("getValuationsDashboard ERROR:", res.error || res.status);
  return null;
}

export async function getValuationDetail(id) {
  const res = await request(`/valuations/dashboard/${id}`);
  if (res.ok) return res.data;
  console.error("getValuationDetail ERROR:", res.error || res.status);
  return null;
}

export async function createValuation(valuationData) {
  const res = await request(`/valuations/calculate`, { method: "POST", body: valuationData });
  if (res.ok) return res.data;
  console.error("createValuation ERROR:", res.error || res.status, "payload:", valuationData);
  return null;
}

export async function assignEmployeeToDashboard(valuationId, employeeId) {
  const res = await request(`/valuations/dashboard/${valuationId}/assign/${employeeId}`, { method: "PUT", expectJson: false });
  if (res.ok) return res.data;
  console.error("assignEmployeeToDashboard ERROR:", res.error || res.status, "url=", `/valuations/dashboard/${valuationId}/assign/${employeeId}`);
  return null;
}

export async function getProperties() {
  const res = await request(`/properties`);
  if (res.ok) return res.data;
  console.error("getProperties ERROR:", res.error || res.status);
  return null;
}
