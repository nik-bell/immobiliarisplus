import { request } from "./request";

export async function getValuationsDashboard() {
  const res = await request("/valuations/dashboard");
  if (res.ok) return res.data;
  return null;
}

export async function getValuationDetail(id) {
  const res = await request(`/valuations/dashboard/${id}`);
  if (res.ok) return res.data;
  return null;
}

export async function createValuation(valuationData) {
  const res = await request(`/valuations/calculate`, { method: "POST", body: valuationData });
  if (res.ok) return res.data;
  return null;
}

export async function assignEmployeeToDashboard(valuationId, employeeId) {
  const res = await request(`/valuations/dashboard/${valuationId}/assign/${employeeId}`, { method: "PUT", expectJson: false });
  if (res.ok) return res.data;
  return null;
}

export async function updateValuationDashboard(id, patchBody) {
  if (!id) {
    return null;
  }
  const res = await request(`/valuations/dashboard/${id}`, { method: "PATCH", body: patchBody });
  if (res.ok) return res.data;
  return null;
}
