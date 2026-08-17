# dsh-enter-approve

Press **Enter** to approve the sandbox permission-escalation prompt in the DeepSeek Harness WebUI - no mouse click required.

## Features

- While an approval panel (`等待审批` / "Waiting for approval") is showing, a plain **Enter** press clicks the **Allow once** button.
- Adds a small hint (`按 Enter 允许一次` / "Press Enter to allow") under the panel's buttons.
- Zero interference elsewhere: ignores Enter while typing, IME composition, modifier keys (Ctrl/Cmd/Shift/Alt + Enter), and whenever no approval panel is present.

## Install

1. Link this package into your dsh profile: `~/.dsh/profiles/web/node_modules/dsh-enter-approve`
2. Add it to `~/.dsh/profiles/web/package.json` under `dependencies` (`"dsh-enter-approve": "link:<absolute path>"`) and to `dsh.profile.bundles`.
3. Fully restart DeepSeek Harness.

## How it works

A tiny browser script is injected into the served index.html through `webServer.tapIndex()`. It listens on `document` (capture phase) for a plain Enter keypress and, while an approval panel (`[data-approval-key]`) exists on screen, forwards the press to the panel's "Allow once" button - the same click path a mouse click uses.

## Uninstall

Remove the `node_modules` link and both references in `package.json`, then restart DSH.

## Credits

This plugin was created entirely by **DeepSeek-v4-flash** through the **DeepSeek Harness**.

> 此插件是完全由DeepSeek-v4-flash通过DeepSeek harness制作的

## License

MIT
