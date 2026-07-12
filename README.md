# Together We Will Salesforce Experience Cloud

This repository contains the Salesforce DX source for the Together We Will
Foundation Experience Cloud site. The active public site is built as an LWR
Experience Cloud site with custom Lightning Web Components, Apex, static
resources, and Experience Bundle metadata.

## Current Site

- Public production domain: https://www.togetherwewill.org.in/
- Production Experience Cloud site name: `TWW`
- Production org alias: `tww-prod`
- Sandbox org alias: `devpro1-sandbox`
- Salesforce API version: `67.0`

The Salesforce-managed production URL can still include the Salesforce site path,
but public navigation should use clean custom-domain URLs such as `/about` and
`/impact`.

## Repository Layout

```text
force-app/main/default/classes              Apex controllers and services
force-app/main/default/lwc                  Lightning Web Components
force-app/main/default/staticresources      Images, documents, and CSS resources
force-app/main/default/digitalExperiences   LWR Experience Bundle metadata
force-app/main/default/networks             Experience Cloud network metadata
force-app/main/default/sites                Salesforce site metadata
force-app/main/default/customMetadata       TWW content records
manifest/package.xml                        Narrow metadata manifest
sfdx-project.json                           Salesforce DX project config
```

Use `force-app` for full source deploys. The manifest is intentionally narrow and
does not represent every Experience Cloud metadata type in this repo.

## Prerequisites

Install or confirm access to:

- Git
- GitHub CLI, optional but useful for issues and PRs
- Salesforce CLI
- Access to `RohanDhameja/TogetherWeWill`
- Salesforce access to the TWW sandbox and production orgs

Check your local Git identity before committing:

```bash
git config user.name
git config user.email
```

Expected project commit identity:

```text
RohanDhameja
rdhameja09@gmail.com
```

Do not commit tokens, session IDs, frontdoor URLs, passwords, certificates, or
private key material.

## Authenticate Orgs

Authenticate the sandbox:

```bash
sf org login web --alias devpro1-sandbox --instance-url https://test.salesforce.com
```

Authenticate production:

```bash
sf org login web --alias tww-prod --instance-url https://login.salesforce.com
```

Verify an org alias before using it:

```bash
sf org display --target-org devpro1-sandbox
sf org display --target-org tww-prod
```

If a session expires, rerun the relevant `sf org login web` command.

## Git Workflow

Do not commit or merge directly on `main`.

For every change:

1. Create or pick a GitHub issue.
2. Start from the latest `main`.
3. Create a feature branch for that issue.
4. Commit the change on the feature branch.
5. Open a pull request into `main`.
6. Merge only through the PR after review.

Example:

```bash
git checkout main
git pull origin main
git checkout -b issue-1-setup-runbook
```

After the change is ready:

```bash
git status
git add README.md
git commit -m "Add setup and deployment runbook"
git push -u origin issue-1-setup-runbook
gh pr create --base main --head issue-1-setup-runbook
```

## Retrieve Source From an Org

Use retrieve when a change was made in Salesforce Setup, Experience Builder, or
an org editor and needs to be brought back into Git.

Retrieve from sandbox:

```bash
sf project retrieve start --target-org devpro1-sandbox --source-dir force-app
```

Retrieve from production only when confirming the live state or recovering a
missing metadata change:

```bash
sf project retrieve start --target-org tww-prod --source-dir force-app
```

Review diffs before committing retrieved metadata because Experience Cloud
retrieves can include broad generated changes.

## Deploy to Sandbox

Validate first when the payload is broad:

```bash
sf project deploy start --target-org devpro1-sandbox --source-dir force-app --dry-run --wait 30
```

Deploy to sandbox:

```bash
sf project deploy start --target-org devpro1-sandbox --source-dir force-app --wait 30
```

For small changes, use a narrower source path, for example:

```bash
sf project deploy start --target-org devpro1-sandbox --source-dir force-app/main/default/lwc/twwHomePageV2 --wait 30
```

Publish the sandbox Experience Cloud site after Experience Builder, route, LWC,
or static resource changes that affect the rendered site:

```bash
sf community publish --name TWW --target-org devpro1-sandbox
```

Sandbox URL used for smoke testing:

```text
https://togetherwewillfoundation2--twwdev.sandbox.my.site.com/togetherwewill/
```

## Deploy to Production

Production changes should come from a merged PR on `main`.

Confirm the branch and latest commit:

```bash
git checkout main
git pull origin main
git log -1 --oneline
```

Run a production validation before deploying:

```bash
sf project deploy start --target-org tww-prod --source-dir force-app --dry-run --test-level RunLocalTests --wait 60
```

Deploy to production:

```bash
sf project deploy start --target-org tww-prod --source-dir force-app --test-level RunLocalTests --wait 60
```

Publish the production Experience Cloud site:

```bash
sf community publish --name TWW --target-org tww-prod
```

The publish operation is asynchronous. If the command returns a job ID, wait for
the publish completion email or check the matching `BackgroundOperation` record
in Salesforce.

## Post-Deploy Smoke Test

After publish, open the public production domain and confirm the core pages load:

```text
https://www.togetherwewill.org.in/
https://www.togetherwewill.org.in/about
https://www.togetherwewill.org.in/impact
https://www.togetherwewill.org.in/donate
https://www.togetherwewill.org.in/get-involved
https://www.togetherwewill.org.in/legal
```

Look for:

- Page renders without "Unable to load content" or "The Apex request is invalid"
- Header and footer links use clean custom-domain URLs
- Static resource images load
- Donation and legal document links open
- Reach Out to Us / Web-to-Lead form renders as expected

If cached content appears, append a cache-busting query string while testing:

```text
?lwr.cachebust=YYYYMMDDHHMM
```

## Common Troubleshooting

Auth failure:

- Rerun `sf org login web` for the affected alias.
- Confirm the alias with `sf org display --target-org <alias>`.

Deploy failure:

- Read the first metadata error before retrying.
- Use a narrower `--source-dir` when only one component changed.
- For production deploys that include Apex, use `--test-level RunLocalTests`
  unless a narrower approved test strategy is chosen.
- Avoid `--ignore-errors` for production deploys.

Publish failure:

- Confirm the Experience Cloud site name is `TWW`.
- Retry `sf community publish --name TWW --target-org <alias>`.
- If a publish job is still running, wait for it to finish before publishing
  again.

Content or Apex request errors on the site:

- Confirm Apex classes, LWCs, static resources, custom metadata, and Experience
  Bundle metadata were deployed together when they are part of the same change.
- Publish the site after deployment.
- Test in a private browser window or use a cache-busting query string.

Static resource image not visible:

- Confirm the file exists under `force-app/main/default/staticresources`.
- Confirm the matching `*.resource-meta.xml` file exists.
- Deploy the static resource and publish the site.

## Useful Links

- Public site: https://www.togetherwewill.org.in/
- GitHub repo: https://github.com/RohanDhameja/TogetherWeWill
- Salesforce CLI command reference: https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm
