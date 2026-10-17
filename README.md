# Firstday: Job Portal for Freshers

A UX/UI capstone project: a responsive job portal that helps fresh graduates find entry-level jobs, build a profile, upload a resume and track their applications. Works on phones (bottom tab bar) and desktops (sidebar with a list and detail view).

## Pages

| File | What it is |
| --- | --- |
| `index.html` | The working app (prototype) |
| `case-study.html` | Full UX case study: research, empathy map, persona, problem statement, information architecture, UI system, test plan |

## App features

- Fresher-friendly job listings with search, Full-time/Internship and Remote/On-site filters
- Job detail with skill match, save and apply
- Profile with name, college, skills, resume upload and a completion meter
- Application tracker with status stages (Applied, Reviewed, Interview, Offer)
- Data is saved in the browser (`localStorage`), so it survives a refresh. Use **Profile > Reset demo data** to start over.
- Installable on a phone home screen (web app manifest)

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Publish with GitHub Pages

1. Create a new repository and upload all files in this folder (keep the `css` and `js` folders).
2. Go to **Settings > Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
3. Your site will be live at `https://<your-username>.github.io/<repository-name>/`.

## UX process

Empathize (survey and interviews), Define (persona, problem statement), Ideate (information architecture, user flow, feature prioritisation), Prototype (this app) and Test (usability plan). The research figures in the case study are sample data: replace them with your own findings.

## Figma

Recreate the screens in Figma using the tokens in the case study (navy `#0E1A2B`, emerald `#0F4C45`, gold `#B8924A`, Instrument Serif and Figtree, 8px grid) and link them into a prototype. Add the Figma link here: `<paste link>`.

## Tech

HTML, CSS and vanilla JavaScript. No build step, no dependencies. Fonts load from Google Fonts.

## Notes

Job listings are sample data. Resume uploads store only the file name in the browser; nothing is sent to a server.
