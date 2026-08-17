/**
 * dsh-enter-approve - host half.
 *
 * Injects a tiny browser script into the served index.html through
 * webServer.tapIndex(). The script listens on document (capture phase) for a
 * plain Enter keypress while a sandbox permission-escalation approval panel
 * ([data-approval-key]) is on screen, and clicks its "Allow once" button - so
 * approving a privilege escalation is a single keypress instead of a mouse
 * click. A small hint row ("Press Enter to allow" / "按 Enter 允许一次") is
 * added under the panel's action row when the panel appears. All other
 * keyboard behaviour is untouched: the listener ignores Enter while focus is
 * in an editable element, ignores modified keys and IME composition, and does
 * nothing when no approval panel exists.
 */

const SCRIPT = `(function () {
  'use strict';
  function isEditable(el) {
    if (!el) return false;
    var t = el.tagName;
    return t === 'INPUT' || t === 'TEXTAREA' || el.isContentEditable;
  }
  function findAllowButton(panel) {
    var row = panel.querySelector('[class*="actionRow"]');
    var buttons = row ? row.querySelectorAll('button') : panel.querySelectorAll('button');
    if (!buttons.length) return null;
    return buttons[buttons.length - 1];
  }
  function addHint(panel) {
    if (panel.querySelector('.dsh-enter-approve-hint')) return;
    var row = panel.querySelector('[class*="actionRow"]');
    if (!row) return;
    var btn = findAllowButton(panel);
    var isZh = btn && /[\u4e00-\u9fff]/.test(btn.textContent || '');
    var hint = document.createElement('div');
    hint.className = 'dsh-enter-approve-hint';
    hint.textContent = isZh ? '按 Enter 允许一次' : 'Press Enter to allow';
    hint.style.cssText = 'font-size:12px;line-height:16px;color:var(--dsw-alias-label-tertiary,#8a8f98);padding:0 16px 12px;text-align:right;user-select:none;opacity:.85;';
    row.parentNode.insertBefore(hint, row);
  }
  function handleKey(e) {
    if (e.key !== 'Enter' || e.isComposing || e.repeat) return;
    if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
    if (isEditable(e.target)) return;
    var panel = document.querySelector('[data-approval-key]');
    if (!panel) return;
    var btn = findAllowButton(panel);
    if (!btn || btn.disabled) return;
    e.preventDefault();
    e.stopPropagation();
    btn.click();
  }
  document.addEventListener('keydown', handleKey, true);
  function scan() {
    var panel = document.querySelector('[data-approval-key]');
    if (panel) addHint(panel);
  }
  if (typeof MutationObserver !== 'undefined') {
    new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true });
  }
  scan();
})();`;

/** Inject the script into the served HTML before </head>. */
function withScript(html) {
  const script = '<script>' + SCRIPT + '<' + '/script>';
  if (html.includes('</head>')) return html.replace('</head>', script + '</head>');
  if (html.includes('</html>')) return html.replace('</html>', script + '</html>');
  return html + script;
}

/** Host loader entry. */
export function apply(ctx) {
  const webServer = ctx.get('webServer');
  if (!webServer) return;
  ctx.effect(() => webServer.tapIndex(withScript));
}
