export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/+$/, '') || '/';

    const isStaticAsset =
      pathname.startsWith('/assets/') ||
      pathname.startsWith('/images/') ||
      pathname.startsWith('/favicon') ||
      pathname.startsWith('/.well-known/') ||
      /\.(js|css|png|jpg|jpeg|gif|svg|ico|webp|woff2?|map)$/i.test(pathname);

    if (
      isStaticAsset ||
      pathname === '/robots.txt' ||
      pathname === '/sitemap.xml' ||
      pathname === '/404.html' ||
      pathname === '/'
    ) {
      return fetch(request);
    }

    return fetch(new URL('/index.html', url.origin), request);
  },
};
