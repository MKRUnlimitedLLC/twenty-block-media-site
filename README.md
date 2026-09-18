# Twenty Block Media — marketing site

Static folder for **Twenty Block Media** (also **20blocks** / 20block). Parent brand plus three desks that stay separate: Person, Political, Corporate.

No build step. No server runtime. No API keys. Open `index.html` or drop the folder on any static host.

Intended live URL: **https://twentyblockmedia.com**  
GitHub Pages source (same pattern as other MKR sites): **https://github.com/MKRUnlimitedLLC/twenty-block-media-site**

## Open locally

Double-click `index.html`, or from this folder:

```bash
python3 -m http.server 47621
```

Then visit `http://127.0.0.1:47621/`. Links use explicit `index.html` files so they also work over `file://`.

## What is in the folder

| Path | Page |
| --- | --- |
| `index.html` | Parent brand and three desk doors |
| `person/index.html` | Person — Matthew Rau’s story / journalism |
| `political/index.html` | Political — Democratic advertising sales |
| `corporate/index.html` | Corporate — non-political company media |
| `contact/index.html` | Contact (mailto to contact@twentyblockmedia.com) |
| `404.html` | Fallback for hosts that use it |
| `CNAME` | `twentyblockmedia.com` (GitHub Pages custom domain) |

Contact: **contact@twentyblockmedia.com** and **info@twentyblockmedia.com**. Place: Fargo, North Dakota. No phone number on purpose.

## GitHub Pages (MKR pattern)

This is the same shape as `kaiden-cooks`, `mkr-unlimited-site`, and `mkr-connect-site`: public repo under **MKRUnlimitedLLC**, Pages from **main** / **root**, `CNAME` file with the apex domain.

1. Create a public repo: `https://github.com/MKRUnlimitedLLC/twenty-block-media-site`
2. Push this folder to `main` (do not put the site in a `docs/` subfolder).
3. Settings → Pages → Build and deployment → **Deploy from a branch** → `main` / `/ (root)`.
4. Custom domain should read `twentyblockmedia.com` from the `CNAME` file. Wait for DNS + HTTPS (keep Cloudflare on **DNS only**, not proxied).

```bash
git remote add github https://github.com/MKRUnlimitedLLC/twenty-block-media-site.git
git push -u github main
```

Until that repo exists, use the zip of this tree (same files, no `.git`).

## Cloudflare DNS for Gatekeeper

`twentyblockmedia.com` already uses Cloudflare nameservers (`nova` / `rob`) and Cloudflare Email Routing (MX + SPF). **Do not change MX or TXT.** Add website records to match `kaidencooks.com` / `mkr-unlimited.com`:

| Type | Name | Content | Proxy |
| --- | --- | --- | --- |
| A | `@` | `185.199.108.153` | DNS only (grey cloud) |
| A | `@` | `185.199.109.153` | DNS only |
| A | `@` | `185.199.110.153` | DNS only |
| A | `@` | `185.199.111.153` | DNS only |
| CNAME | `www` | `mkrunlimitedllc.github.io` | DNS only |

Do not point `@` at `mkrunlimitedllc.github.io` as a proxied CNAME. Sister MKR sites use apex **A** records to GitHub Pages IPs and a **www** CNAME. Grey-cloud is required so GitHub can issue the Pages certificate.

Optional IPv6 (GitHub documents these; sister sites currently omit them):

| Type | Name | Content | Proxy |
| --- | --- | --- | --- |
| AAAA | `@` | `2606:50c0:8000::153` | DNS only |
| AAAA | `@` | `2606:50c0:8001::153` | DNS only |
| AAAA | `@` | `2606:50c0:8002::153` | DNS only |
| AAAA | `@` | `2606:50c0:8003::153` | DNS only |

After Pages is enabled, `https://mkrunlimitedllc.github.io/twenty-block-media-site/` should redirect to the custom domain.

## Other hosts

Point the host at this directory (the one that contains `index.html`). Pretty URLs such as `/person/` work on most hosts because each desk folder has its own `index.html`.

**Netlify.** Drag this folder onto [Netlify Drop](https://app.netlify.com/drop), or connect the repo with publish directory empty / `.` and no build command.

**Cloudflare Pages.** Connect the repo. Build command empty. Output directory empty / `.`.

**Amazon S3.** Upload the folder. Enable static website hosting. Default document: `index.html`. Error document: `404.html`.

**Apache / nginx.** Document root = this folder; `index index.html`.

Subdirectory installs work because every asset and link is relative. Do not rewrite those to root-absolute paths unless the site will only ever live at a domain root.

## What this site does not claim

No live LLC filing, trademark registration, client logos, spend, or FEC compliance program. Those are not done, so they are not on the pages.
