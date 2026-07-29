export const changelogEntries = [
  {
    status: "改进", tone: "improved", date: "2026年6月13日", title: "Figma 集成", image: "/assets/changelog-figma.webp", tabletImage: "/assets/changelog-figma-tablet.avif", mobileImage: "/assets/changelog-figma-mobile.avif",
    paragraphs: [
      "Madora 现在可以直接与 Figma 集成。你可以将 Figma 文件关联到任意任务，并直接在工作区内预览设计，无需离开当前页面。",
      "附加 Figma 文件后，任务会显示实时预览缩略图，并在设计发生变化时自动更新。团队成员既可以打开完整的 Figma 文件，也可以直接在任务详情中审阅预览，无需再把链接粘贴到评论中，或频繁切换工具查看设计进度。",
      "该集成同样支持 Figma 的分支功能。如果设计团队使用分支进行迭代，Madora 会在预览旁显示分支名称，确保审阅者始终清楚当前查看的是哪个版本。",
      "如需连接 Figma，请前往“设置 → 集成”并授权你的 Figma 工作区。连接完成后，即可通过附件菜单将文件添加到任意任务。",
    ],
  },
  {
    status: "新增", tone: "new", date: "2026年6月1日", title: "Business 方案支持自定义自动化规则", image: "/assets/blog-q1.webp", tabletImage: "/assets/blog-q1-tablet.avif", mobileImage: "/assets/blog-q1-card.avif",
    paragraphs: [
      "所有 Business 方案用户现已可以使用自定义自动化规则。你可以直接在 Madora 中构建自己的 if/then 工作流，无需编写代码，也无需借助第三方工具。",
      "你可以根据状态变化、截止日期、负责人更新、优先级调整等条件触发操作。例如，当任务被标记为“已完成”时，Madora 可以自动通知项目负责人并将任务移至“审阅”列；当距离截止时间不足 48 小时且任务仍为“进行中”时，负责人会收到提醒；在指定项目中创建新任务后，也可以立即自动分配给合适的成员。",
      "我们还提供了 12 个预置自动化模板，帮助你快速开始。这些模板覆盖团队最常用的工作流，包括状态通知、任务分派、截止日期提醒和每周摘要。你可以直接使用，也可以根据团队的工作方式进行定制。",
      "自定义规则位于“项目设置 → 自动化”中。如果你正在使用 Pro 方案，可以在账户设置中升级至 Business。",
    ],
  },
  {
    status: "修复", tone: "fix", date: "2026年3月10日", title: "通知偏好现在可以正确保存", image: "/assets/changelog-notifications.webp", tabletImage: "/assets/changelog-notifications-tablet.avif", mobileImage: "/assets/changelog-notifications-mobile.avif",
    paragraphs: [
      "我们修复了退出登录后自定义通知偏好会恢复为默认设置的问题。该问题影响了少量用户，主要涉及曾在多个项目中调整通知设置的账户。",
      "此前，如果你关闭了某个项目的通知或调整了邮件摘要频率，这些设置可能会在下次登录后恢复。现在，你的偏好可以在不同会话、设备和浏览器之间正确保留。",
      "如果你之前发现调整后的通知设置会被还原，现在应该已经能够正常保存。无需进行任何操作，该修复已自动应用到所有账户。",
    ],
  },
];
