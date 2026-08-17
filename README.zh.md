# dsh-enter-approve · Enter 批准快捷键

[![English](https://img.shields.io/badge/English-View%20English-1f6feb?style=for-the-badge)](./README.md)

> 此插件是完全由DeepSeek-v4-flash通过DeepSeek harness制作的

按 **Enter** 即可批准 DeepSeek Harness WebUI 中的沙箱权限提升审批窗口，无需鼠标点击。

## 功能特性

- 当审批窗口（「等待审批」）显示时，按 **Enter** 直接点击「允许一次」按钮。
- 在按钮下方显示「按 Enter 允许一次」快捷键提示。
- 不影响其他操作：输入文字、输入法组合、修饰键（Ctrl/Cmd/Shift/Alt + Enter）以及没有审批窗口时，Enter 均不会被拦截。

## 安装

1. 将本包链接到 dsh profile：`~/.dsh/profiles/web/node_modules/dsh-enter-approve`
2. 在 `~/.dsh/profiles/web/package.json` 的 `dependencies`（`"dsh-enter-approve": "link:<绝对路径>"`）与 `dsh.profile.bundles` 中登记本包。
3. 完全重启 DeepSeek Harness。

## 工作原理

通过 `webServer.tapIndex()` 向页面 index.html 注入一段浏览器脚本：脚本在 `document` 上以捕获阶段监听 Enter 键，当页面上存在审批窗口（`[data-approval-key]`）时，将按键转发给「允许一次」按钮——与鼠标点击完全相同的应答路径。

## 卸载

删除 `node_modules` 链接及 `package.json` 中的两处引用，然后重启 DSH。

## 声明

此插件是完全由DeepSeek-v4-flash通过DeepSeek harness制作的。

## 许可证

MIT
