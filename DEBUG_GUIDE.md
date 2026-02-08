# Debugging Vercel Deployment

1.  Open your deployed blog post: [https://personal-blog-h31a208e2-soyoung-kim-235s-projects.vercel.app/posts](https://personal-blog-h31a208e2-soyoung-kim-235s-projects.vercel.app/posts) (Click on any post)
2.  Right-click anywhere on the page and select **Inspect** (검사).
3.  Click the **Console** tab at the top of the developer tools.
4.  Look for a message starting with `Giscus Config:`.
5.  If you see `Giscus config missing` or values are `undefined`, then the environment variables are definitely not loaded.
6.  If you see the correct values, then Giscus script might be blocked by browser settings or extensions.
