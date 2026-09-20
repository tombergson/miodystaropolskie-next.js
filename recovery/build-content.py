#!/usr/bin/env python3
import json, re
from pathlib import Path
from html import unescape

ROOT = Path(__file__).resolve().parent
RAW = ROOT / "raw"
OUT_POSTS = ROOT / "content" / "posts"
OUT_HONEYS = ROOT / "content" / "honeys"
OUT_PAGES = ROOT / "content" / "pages"
for d in (OUT_POSTS, OUT_HONEYS, OUT_PAGES):
    d.mkdir(parents=True, exist_ok=True)

HONEY = {
    "miod-wielokwiatowy",
    "miod-akacjowy",
    "miod-lipowy",
    "miod-spadziowy",
    "miod-nawlociowy",
}
SKIP_PAGES = {"wpforms-preview"}

def uploads_to_public(url: str) -> str | None:
    if not url or "/uploads/" not in url:
        return None
    rel = url.split("/uploads/")[-1].split("?")[0]
    return f"/images/uploads/{rel}"

def extract_images(html: str) -> list[str]:
    out = []
    for src in re.findall(r'src=["\']([^"\']+)["\']', html or ""):
        p = uploads_to_public(src)
        if p and p not in out:
            out.append(p)
    return out

def rewrite_html(html: str) -> str:
    def repl(m):
        pub = uploads_to_public(m.group(1))
        return f'src="{pub or m.group(1)}"'
    return re.sub(r'src=["\']([^"\']+)["\']', repl, html or "")

def strip_tags(html: str) -> str:
    t = re.sub(r"<[^>]+>", " ", html or "")
    return re.sub(r"\s+", " ", unescape(t)).strip()

def save(folder: Path, name: str, obj: dict):
    (folder / name).write_text(
        json.dumps(obj, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print("OK", folder.name + "/" + name)

posts = json.loads((RAW / "posts.json").read_text(encoding="utf-8"))
pages = json.loads((RAW / "pages.json").read_text(encoding="utf-8"))

for p in posts:
    date = (p.get("post_date") or "")[:10]
    slug = p["post_name"]
    html = p.get("post_content") or ""
    save(
        OUT_POSTS,
        f"{date}-{slug}.json",
        {
            "slug": slug,
            "title": p["post_title"],
            "date": date,
            "excerpt": strip_tags(html)[:280],
            "contentHtml": rewrite_html(html),
            "images": extract_images(html),
            "oldUrl": f"/{date.replace('-', '/')}/{slug}/" if date else f"/{slug}/",
        },
    )

for p in pages:
    slug = p["post_name"]
    if slug in SKIP_PAGES:
        continue
    html = p.get("post_content") or ""
    item = {
        "slug": slug,
        "title": p["post_title"],
        "contentHtml": rewrite_html(html),
        "images": extract_images(html),
        "oldUrl": f"/{slug}/",
    }
    if slug in HONEY:
        save(OUT_HONEYS, f"{slug}.json", item)
    elif slug in ("kontakt", "polityka-prywatnosci"):
        save(OUT_PAGES, f"{slug}.json", item)

print("---")
print("posts:", len(list(OUT_POSTS.glob("*.json"))))
print("honeys:", len(list(OUT_HONEYS.glob("*.json"))))
print("pages:", len(list(OUT_PAGES.glob("*.json"))))