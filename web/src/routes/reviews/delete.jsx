import { redirect } from "react-router";
import { apiFetch } from "../../api";

export async function action({ params, request }) {
  const { album } = Object.fromEntries(await request.formData());
  const response = await apiFetch('DELETE', `/reviews/${params.id}`);
  // TODO error handling
  return redirect(`/albums/${album}`);
}