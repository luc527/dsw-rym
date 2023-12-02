import { redirect } from "react-router";
import { apiFetch } from "../../api";

export async function action({ params }) {
  await apiFetch('DELETE', `artists/${params.id}`);
  // TODO error handling
  return redirect(`/artists`);
}