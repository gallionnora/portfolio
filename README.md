# Nora Gallion: Portfolio

A plain HTML/CSS/JS site. All content lives in three files in `data/`, so you never touch the code to add things.

## Add a project
1. Put an image in `images/` (e.g. `images/my-new-project.jpg`). Keep it under ~500 KB.
2. Open `data/projects.json` and paste a new block **at the top** of the list (newest first):

```json
{
  "title": "Project name",
  "summary": "A few sentences on what you made, how, and the result.",
  "tags": ["SolidWorks", "3D printing"],
  "image": "images/my-new-project.jpg",
  "link": "https://optional-link-to-report-or-repo.com"
}
```
`image`, `link`, and `tags` are optional. Blocks are separated by commas, and the last one has no trailing comma.

## Add a job, school, or club
Open `data/experience.json`, find the right `group` (Work, Education, Leadership), and add an item to its `items` list:

```json
{
  "dates": "Jun 2026 - Aug 2026",
  "title": "Mechanical Engineering Intern",
  "org": "Company Name",
  "bullets": ["What you did", "Another thing you did"]
}
```
Use `"details": "A paragraph"` instead of `bullets` if you prefer prose. Need a new section? Add another `{ "group": "Awards", "items": [ ... ] }`.

## Change bio, contact info, or skills
Edit `data/site.json`. Your profile photo is `images/profile.jpg`.

## Publish with GitHub Pages
1. Create a new repository on GitHub (e.g. `noragallion.github.io` for a clean URL, or any name).
2. Upload all of these files, or from a terminal:
   ```
   git init && git add . && git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```
3. In the repo go to **Settings > Pages**, set Source to **Deploy from a branch**, choose `main` and `/ (root)`, and save.
4. Your site goes live at `https://YOUR-USERNAME.github.io/YOUR-REPO/` within a minute or two. Every later edit (even in GitHub's web editor) updates it automatically.

## Preview locally
Browsers block data loading from double-clicked files, so run:
```
python3 -m http.server
```
and open http://localhost:8000.

## Troubleshooting
If the page shows an error box, a JSON file has a typo (usually a missing comma or quote). Paste it into https://jsonlint.com to find it.
