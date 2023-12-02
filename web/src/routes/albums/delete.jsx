import { apiFetch } from "../../api";
import { redirect } from "react-router";

export async function action({ params, request }) {
  const {artist} = Object.fromEntries(await request.formData());
  await apiFetch('DELETE', `/albums/${params.id}`)
  return redirect(`/artists/${artist}`);
}