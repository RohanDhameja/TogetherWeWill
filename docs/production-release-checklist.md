# Production Release Checklist

Use this checklist when deploying changes to the Together We Will production
Salesforce Experience Cloud site.

## Release Rules

- Do not commit or merge directly on `main`.
- Every production change must start from a GitHub issue.
- Work must happen on a feature branch.
- Production deploys should come from reviewed code that has been merged into
  `main`.
- Do not deploy local experimental changes directly to production.
- Do not commit or paste tokens, session IDs, frontdoor URLs, passwords,
  certificates, private keys, or Salesforce CLI auth output into GitHub.

## Key Targets

```text
GitHub repository: RohanDhameja/TogetherWeWill
Production org alias: tww-prod
Production Experience Cloud site name: TWW
Public domain: https://www.togetherwewill.org.in/
```

## Pre-Release Checks

Confirm the change is tied to a GitHub issue:

```bash
gh issue view <issue-number> --repo RohanDhameja/TogetherWeWill
```

Confirm the PR is merged into `main` before production deployment:

```bash
gh pr view <pr-number> --repo RohanDhameja/TogetherWeWill
```

Sync the local repository:

```bash
git checkout main
git pull origin main
git status
git log -1 --oneline
```

Confirm the production org alias is valid:

```bash
sf org display --target-org tww-prod
```

Confirm the production Experience Cloud network is live:

```bash
sf data query --target-org tww-prod --query "SELECT Name, UrlPathPrefix, Status FROM Network WHERE Name = 'TWW'"
```

Before deploying, review the diff between the last production release and the
commit being released. Make sure the release contains only intended metadata,
static resources, documentation, and code changes.

## Sandbox Validation

When possible, validate the same branch or merged commit in sandbox before
production.

Validate the deployment:

```bash
sf project deploy start --target-org devpro1-sandbox --source-dir force-app --dry-run --wait 30
```

Deploy to sandbox:

```bash
sf project deploy start --target-org devpro1-sandbox --source-dir force-app --wait 30
```

Publish the sandbox Experience Cloud site:

```bash
sf community publish --name TWW --target-org devpro1-sandbox
```

Sandbox smoke-test URL:

```text
https://togetherwewillfoundation2--twwdev.sandbox.my.site.com/togetherwewill/
```

## Production Deployment

Run a production validation first:

```bash
sf project deploy start --target-org tww-prod --source-dir force-app --dry-run --test-level RunLocalTests --wait 60
```

Deploy to production:

```bash
sf project deploy start --target-org tww-prod --source-dir force-app --test-level RunLocalTests --wait 60
```

Do not use `--ignore-errors` for production. If the deployment fails, stop,
review the first error, fix the branch through a PR, and redeploy after review.

## Publish Experience Cloud Site

After a successful metadata deployment, publish the production site:

```bash
sf community publish --name TWW --target-org tww-prod
```

Publishing is asynchronous. Wait for the completion email or query the relevant
`BackgroundOperation` record if the CLI returns a job ID.

## Post-Release Smoke Test

Confirm the public pages load after the publish finishes:

```text
https://www.togetherwewill.org.in/
https://www.togetherwewill.org.in/about
https://www.togetherwewill.org.in/impact
https://www.togetherwewill.org.in/donate
https://www.togetherwewill.org.in/get-involved
https://www.togetherwewill.org.in/legal
```

Check these items:

- Page content loads without "Unable to load content" messages.
- No page shows "The Apex request is invalid".
- Header and footer links use clean custom-domain paths.
- Static resource images render.
- Donation and legal document links open.
- Reach Out to Us / Web-to-Lead form renders.
- Mobile layout remains readable.

Use a cache-busting query string if cached content appears during testing:

```text
?lwr.cachebust=YYYYMMDDHHMM
```

## Rollback Guidance

Metadata rollback should be handled from Git, not by editing production directly.

If a release creates a production issue:

1. Stop additional production deploys.
2. Capture the failing URL, timestamp, symptoms, and affected pages.
3. Identify the last known good commit on `main`.
4. Create a rollback branch from the current `main`.
5. Revert the problematic merge commit or restore the affected files from the
   last known good commit.
6. Open a rollback PR and get it reviewed.
7. Merge the rollback PR into `main`.
8. Deploy the updated `main` to production.
9. Publish the `TWW` Experience Cloud site again.
10. Run the post-release smoke test.

Example rollback branch:

```bash
git checkout main
git pull origin main
git checkout -b rollback/<issue-or-pr-number>
git revert <merge-commit-sha>
```

If a revert creates conflicts, resolve only the files involved in the failing
release and keep unrelated work out of the rollback PR.

## Rollback Limits

- Metadata rollback does not automatically reverse data changes made by users,
  automations, imports, or form submissions.
- DNS, certificate, and Salesforce domain changes can have propagation delays.
- If a production issue involves permissions, guest access, or Experience Cloud
  routing, include both metadata deployment and site publish in the rollback
  plan.
- If a static resource was changed, verify both the resource file and matching
  `*.resource-meta.xml` are included in the rollback.

## Release Record

For each production release, record:

```text
Issue:
PR:
Release commit:
Deployed by:
Production validation completed:
Production deploy completed:
Experience Cloud publish completed:
Smoke test completed:
Rollback needed:
Notes:
```
