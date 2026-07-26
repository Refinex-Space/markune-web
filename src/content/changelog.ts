export const changelogEntries = [
  {
    status: "Improved", date: "Jun 13, 2026", title: "Figma integration", image: "/assets/changelog-figma.webp", tabletImage: "/assets/changelog-figma-tablet.avif", mobileImage: "/assets/changelog-figma-mobile.avif",
    paragraphs: [
      "Flowline now integrates directly with Figma. You can link Figma files to any task and preview designs inline without leaving your workspace.",
      "When a Figma file is attached, the task displays a live preview thumbnail that updates automatically when the design changes. Team members can click through to the full Figma file, or review the preview directly in the task detail view. This eliminates the need to paste links in comments or switch between tools to check design progress.",
      "The integration also works with Figma's branching feature. If your design team uses branches for iterations, Flowline will display the branch name alongside the preview so reviewers always know which version they're looking at.",
      "To connect Figma, go to Settings → Integrations and authorize your Figma workspace. Once connected, you can attach files to any task using the attachment menu.",
    ],
  },
  {
    status: "New", date: "Jun 1, 2026", title: "Custom automation rules for Business plans", image: "/assets/blog-q1.webp", tabletImage: "/assets/blog-q1-tablet.avif", mobileImage: "/assets/blog-q1-card.avif",
    paragraphs: [
      "Custom automation rules are now available for all Business plan users. This lets you build your own if/then workflows directly inside Flowline — no code, no third-party tools needed.",
      "You can trigger actions based on status changes, due dates, assignee updates, priority shifts, and more. For example, when a task is marked \"Done,\" Flowline can automatically notify the project lead and move it to the \"Review\" column. When a due date is within 48 hours and the task is still \"In Progress,\" the assignee gets a reminder. When a new task is created in a specific project, it can be auto-assigned to the right person immediately.",
      "We've also included 12 pre-built automation templates so you don't have to start from scratch. These cover the most common workflows teams use — status notifications, assignment routing, due date reminders, and weekly digests. You can use them as-is or customize them to fit how your team works.",
      "Custom rules are available under Project Settings → Automations. If you're on a Pro plan and want access, you can upgrade to Business from your account settings.",
    ],
  },
  {
    status: "Fix", date: "Mar 10, 2026", title: "Notification preferences saving correctly", image: "/assets/changelog-notifications.webp", tabletImage: "/assets/changelog-notifications-tablet.avif", mobileImage: "/assets/changelog-notifications-mobile.avif",
    paragraphs: [
      "We've fixed an issue where custom notification preferences would reset to default settings after logging out. This affected a small percentage of users, primarily those who had customized their notification settings across multiple projects.",
      "Previously, if you turned off notifications for a specific project or adjusted your email digest frequency, those changes could revert after your next login. Your preferences now persist correctly across sessions, devices, and browsers.",
      "If you previously adjusted your notification settings and noticed them reverting, they should now be saved correctly. No action is needed on your end — the fix was applied automatically to all accounts.",
    ],
  },
];
