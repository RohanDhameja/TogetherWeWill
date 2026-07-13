# Public Site URL Validation

Use this checklist after Salesforce Experience Cloud changes are deployed and
published. It verifies that the public TWW custom-domain pages load, avoid known
Experience Cloud error messages, and keep clean custom-domain links.

## Quick Automated Check

Run the default production check:

```bash
bash scripts/validate-public-site.sh
```

Run against sandbox:

```bash
TWW_SITE_BASE_URL=https://togetherwewillfoundation2--twwdev.sandbox.my.site.com/togetherwewill bash scripts/validate-public-site.sh
```

Run against a specific page list:

```bash
bash scripts/validate-public-site.sh / /about /impact /donate /legal
```

Optional environment variables:

```text
TWW_SITE_BASE_URL   Base URL to validate. Defaults to https://www.togetherwewill.org.in
TWW_CACHE_BUST      Cache-busting value appended as lwr.cachebust.
TWW_CURL_TIMEOUT    Per-page curl timeout in seconds. Defaults to 20.
CURL_BIN            curl executable path. Defaults to curl.
```

The script follows redirects and treats final HTTP status codes from 200 through
399 as successful. It also scans responses for common Experience Cloud failures.

## Default Pages

The automated check covers these public routes:

```text
/
/about
/working-model
/initiatives
/impact
/partners
/get-involved
/get-involved/reach-out
/contact
/donate
/news-media
/legal
```

## Manual Checklist

Open the public custom domain in a browser:

```text
https://www.togetherwewill.org.in/
```

Check these pages manually:

```text
https://www.togetherwewill.org.in/about
https://www.togetherwewill.org.in/working-model
https://www.togetherwewill.org.in/initiatives
https://www.togetherwewill.org.in/impact
https://www.togetherwewill.org.in/partners
https://www.togetherwewill.org.in/get-involved
https://www.togetherwewill.org.in/get-involved/reach-out
https://www.togetherwewill.org.in/contact
https://www.togetherwewill.org.in/donate
https://www.togetherwewill.org.in/news-media
https://www.togetherwewill.org.in/legal
```

Expected result:

- Each page loads without Salesforce error text.
- Header and footer navigation links stay on `www.togetherwewill.org.in`.
- Public links do not expose `/togetherwewill/` on the custom domain.
- Static resource images render.
- Donation and legal document links open.
- Reach Out to Us form renders.
- Mobile layout remains readable.

## Failure Symptoms

Investigate before closing a release if any page shows:

```text
Unable to load content
The Apex request is invalid
Something went wrong
Service Not Available
404 or 5xx status codes
Links containing /togetherwewill/ on the custom domain
Missing static resource images
Broken donation or legal document links
```

## Troubleshooting

If public pages fail immediately after deploy:

- Confirm the metadata deployment succeeded.
- Publish the `TWW` Experience Cloud site.
- Retry with a cache-busting query string.
- Test in a private browser window.
- Confirm Apex, LWC, static resources, custom metadata, and Experience Bundle
  changes were deployed together when they are part of the same feature.

Use a cache-busting query string while testing:

```text
?lwr.cachebust=YYYYMMDDHHMM
```

If clean custom-domain links fail:

- Check `sitePath()` usage in `twwHomePageV2` and `twwContentPages`.
- Confirm public-domain URLs use root-relative paths such as `/about` and
  `/impact`.
- Confirm Salesforce `my.site.com` fallback behavior still uses the configured
  site path where needed.
