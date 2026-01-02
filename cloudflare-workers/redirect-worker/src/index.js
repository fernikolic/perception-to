export default {
  async fetch(request) {
    const url = new URL(request.url);
    const destination = `https://perception.to${url.pathname}${url.search}`;
    return Response.redirect(destination, 301);
  }
}
