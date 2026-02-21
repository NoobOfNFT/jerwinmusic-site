# Deploy JERWIN site to GitHub Pages

## 1) Authenticate GitHub CLI (once)
```bash
gh auth login
```

## 2) Create repo and push
```bash
cd /home/josh/.openclaw/workspace/music/seo/gh-pages-site
git init
git add .
git commit -m "Initial JERWIN SEO site"
gh repo create jerwinmusic-site --public --source=. --remote=origin --push
```

## 3) Enable Pages from main branch
```bash
gh api repos/:owner/jerwinmusic-site/pages \
  -X POST \
  -f source[branch]=main \
  -f source[path]=/
```

## 4) Add custom domain in Pages settings
- Domain: `jerwinmusic.com`
- Enforce HTTPS: ON (after cert provisioning)

## 5) DNS at Squarespace Domains
Use exactly:
- A @ 185.199.108.153
- A @ 185.199.109.153
- A @ 185.199.110.153
- A @ 185.199.111.153
- CNAME www -> <your-github-username>.github.io

Remove old A records (198.49.23.144/145 and 198.185.159.144/145).

## 6) Verify
```bash
nslookup jerwinmusic.com
curl -I https://jerwinmusic.com
```

## 7) Google indexing
- Add property in Search Console
- Submit: `https://jerwinmusic.com/sitemap.xml`
- Request indexing for `/`, `/about.html`, `/music.html`, `/faq.html`
