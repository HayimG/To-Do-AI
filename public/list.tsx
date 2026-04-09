export async function GET(req: Request) {
  const url = new URL(req.url)
  const html = url.searchParams.get("html") || ""
  const el = document.createElement("div")
  el.innerHTML = html
  return new Response("ok")
}
