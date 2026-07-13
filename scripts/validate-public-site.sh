#!/usr/bin/env bash
set -u

BASE_URL="${TWW_SITE_BASE_URL:-https://www.togetherwewill.org.in}"
BASE_URL="${BASE_URL%/}"
CACHE_BUST="${TWW_CACHE_BUST:-$(date +%Y%m%d%H%M%S)}"
CURL_TIMEOUT="${TWW_CURL_TIMEOUT:-20}"
CURL_BIN="${CURL_BIN:-curl}"

DEFAULT_PATHS=(
  "/"
  "/about"
  "/working-model"
  "/initiatives"
  "/impact"
  "/partners"
  "/get-involved"
  "/get-involved/reach-out"
  "/contact"
  "/donate"
  "/news-media"
  "/legal"
)

if (($# > 0)); then
  PATHS=("$@")
else
  PATHS=("${DEFAULT_PATHS[@]}")
fi

ERROR_PATTERNS=(
  "Unable to load content"
  "The Apex request is invalid"
  "Service Not Available"
)

BAD_CUSTOM_DOMAIN_LINK_PATTERNS=(
  'href="/togetherwewill/'
  "href='/togetherwewill/"
  'href=/togetherwewill/'
)

tmp_dir="$(mktemp -d)"
trap 'rm -rf "$tmp_dir"' EXIT

failures=0

url_for_path() {
  local path="$1"

  if [[ "$path" != /* ]]; then
    path="/$path"
  fi

  if [[ "$path" == "/" ]]; then
    printf "%s/?lwr.cachebust=%s" "$BASE_URL" "$CACHE_BUST"
  else
    printf "%s%s?lwr.cachebust=%s" "$BASE_URL" "$path" "$CACHE_BUST"
  fi
}

body_file_for_path() {
  local path="$1"
  local safe_name="${path//\//_}"

  if [[ -z "$safe_name" || "$safe_name" == "_" ]]; then
    safe_name="home"
  fi

  printf "%s/%s.html" "$tmp_dir" "$safe_name"
}

check_page() {
  local path="$1"
  local url
  local body_file
  local status
  local bytes
  local page_failed=0

  url="$(url_for_path "$path")"
  body_file="$(body_file_for_path "$path")"

  status="$("$CURL_BIN" -L -sS --max-time "$CURL_TIMEOUT" -o "$body_file" -w "%{http_code}" "$url")"

  if [[ ! "$status" =~ ^[0-9]{3}$ ]] || ((status < 200 || status >= 400)); then
    printf "FAIL %-24s HTTP %s %s\n" "$path" "$status" "$url"
    page_failed=1
  fi

  bytes="$(wc -c < "$body_file" | tr -d ' ')"
  if [[ -z "$bytes" || "$bytes" -lt 500 ]]; then
    printf "FAIL %-24s response body is unexpectedly small (%s bytes)\n" "$path" "${bytes:-0}"
    page_failed=1
  fi

  for pattern in "${ERROR_PATTERNS[@]}"; do
    if grep -Fqi "$pattern" "$body_file"; then
      printf "FAIL %-24s contains error text: %s\n" "$path" "$pattern"
      page_failed=1
    fi
  done

  if [[ "$BASE_URL" == *"togetherwewill.org.in"* ]]; then
    for pattern in "${BAD_CUSTOM_DOMAIN_LINK_PATTERNS[@]}"; do
      if grep -Fq "$pattern" "$body_file"; then
        printf "FAIL %-24s exposes Salesforce site path pattern: %s\n" "$path" "$pattern"
        page_failed=1
      fi
    done
  fi

  if ((page_failed == 0)); then
    printf "PASS %-24s HTTP %s %s\n" "$path" "$status" "$url"
  else
    failures=$((failures + 1))
  fi
}

printf "Validating %s\n" "$BASE_URL"
printf "Cache bust key: %s\n\n" "$CACHE_BUST"

for path in "${PATHS[@]}"; do
  check_page "$path"
done

printf "\n"
if ((failures > 0)); then
  printf "Validation failed: %s page(s) need attention.\n" "$failures"
  exit 1
fi

printf "Validation passed: %s page(s) checked.\n" "${#PATHS[@]}"
