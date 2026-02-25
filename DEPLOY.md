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

### Troubleshooting: HTTPS Certificate Issues
If GitHub Pages hasn't issued a TLS certificate after DNS propagation (can take hours to days), trigger re-provisioning:

```bash
cd /home/josh/.openclaw/workspace/music/seo/gh-pages-site
# Remove CNAME temporarily
git rm CNAME
git commit -m "Temporarily remove CNAME to trigger cert re-provisioning"
git push
# Re-add CNAME
echo "jerwinmusic.com" > CNAME
git add CNAME
git commit -m "Re-add CNAME to trigger certificate issuance"
git push
```

Wait a few minutes, then verify:
```bash
curl -I https://jerwinmusic.com
```

Once HTTPS is working, enable enforcement:
```bash
gh api repos/:owner/jerwinmusic-site/pages -X PUT \
  --input - <<< '{"cname":"jerwinmusic.com","https_enforced":true}'
```

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
