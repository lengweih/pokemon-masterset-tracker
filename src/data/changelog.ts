import type { ChangelogEntry } from "../types/changelog";

/**
  {
    date: "JUN 20, 2026",
    description: "",
    dotColor: "#2F80FF" or "#7B61FF" or "#C061FF",
    title: "",
    version: "v1.0.0",
  },
*/
export const changelogEntries: ChangelogEntry[] = [
  {
    date: "AUG 20, 2026",
    description:
      "Updated the release date for a few products. Fix set completion rounding and add arrow-key card navigation.",
    dotColor: "#2F80FF",
    title: "Bugfix & Improvements",
    version: "v1.0.2",
  },
  {
    date: "JUN 28, 2026",
    description: "Updated the hero image on dashboard screen.",
    dotColor: "#7B61FF",
    title: "Cosmetic Update",
    version: "v1.0.1",
  },
  {
    date: "JUN 20, 2026",
    description:
      "This release includes all the core features and functionalities.",
    dotColor: "#C061FF",
    title: "Official Release",
    version: "v1.0.0",
  },
];

// The app's current version is the newest changelog entry's version (entries are
// ordered newest-first). The footer reads this, so bumping the changelog keeps
// the displayed version in sync — no separate version field to remember.
export const appVersion = changelogEntries[0]?.version ?? "v0.0.0";
