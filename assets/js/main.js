/* DeepSeek Harness 费曼教程 · 交互脚本（无任何外部依赖） */
(function () {
  'use strict';

  /* ---------- 侧边栏（移动端抽屉） ---------- */
  var sidebar = document.getElementById('sidebar');
  var menuBtn = document.getElementById('menuBtn');

  function closeSidebar() {
    if (sidebar) sidebar.classList.remove('open');
  }

  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', function () {
      sidebar.classList.toggle('open');
    });
    sidebar.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeSidebar();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeSidebar();
    });
  }

  /* ---------- 代码复制按钮 ---------- */
  document.querySelectorAll('.codeblock').forEach(function (block, i) {
    var pre = block.querySelector('pre');
    if (!pre) return;
    var btn = block.querySelector('.cb-copy');
    if (!btn) return;

    var copyText = function () {
      // 去掉行内语法高亮产生的多余换行/空格干扰：直接读 pre 文本
      var text = pre.innerText.replace(/\n$/, '');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(ok, fallback);
      } else {
        fallback();
      }
      function ok() { flash(); }
      function fallback() {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); flash(); } catch (_) { /* noop */ }
        document.body.removeChild(ta);
      }
      function flash() {
        btn.textContent = '已复制 ✓';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = '复制';
          btn.classList.remove('copied');
        }, 1600);
      }
    };

    btn.addEventListener('click', copyText);
  });

  /* ---------- 费曼自查折叠 ---------- */
  document.querySelectorAll('.quiz-item').forEach(function (item) {
    var q = item.querySelector('.q');
    if (!q) return;
    q.setAttribute('role', 'button');
    q.setAttribute('tabindex', '0');
    q.addEventListener('click', function () { item.classList.toggle('open'); });
    q.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.classList.toggle('open');
      }
    });
  });

  /* ---------- 阅读进度条 ---------- */
  var bar = document.getElementById('progressBar');
  var progText = document.getElementById('progressText');
  if (bar) {
    var update = function () {
      var doc = document.documentElement;
      var total = doc.scrollHeight - doc.clientHeight;
      var pct = total > 0 ? Math.min(100, Math.round((window.scrollY / total) * 100)) : 0;
      bar.style.width = pct + '%';
      if (progText) progText.textContent = pct + '%';
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ---------- 轻量语法高亮 ----------
     保守策略：先转义 HTML，再按行做规则替换，只作用于 .codeblock pre。
     关键字/字符串/注释/数字/函数名。yaml 与 sh 共用一套近似规则。 */
  var HIGHLIGHT_RULES = [
    { type: 'c', re: /(\/\/[^\n]*|#[^\n]*)/g },               // 注释（含 yaml 的 #）
    { type: 's', re: /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g }, // 字符串
    { type: 'n', re: /\b(\d+(?:\.\d+)?)\b/g },                 // 数字
    { type: 'k', re: /\b(const|let|var|function|return|await|async|import|export|from|if|else|for|while|of|in|new|class|extends|type|interface|enum|switch|case|break|throw|try|catch|finally|true|false|null|undefined|void|yield|static|readonly|declare|this|def|lambda|not)\b/g },
    { type: 'f', re: /\b([a-zA-Z_$][\w$]*)\(/g }               // 函数调用
  ];

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  document.querySelectorAll('.codeblock pre code').forEach(function (code) {
    var raw = code.getAttribute('data-raw');
    if (raw === null) {
      raw = code.textContent;
      code.setAttribute('data-raw', raw);
    }
    var escaped = escapeHtml(raw);
    var highlighted = escaped;
    HIGHLIGHT_RULES.forEach(function (rule) {
      highlighted = highlighted.replace(rule.re, function (m, g1, offset, str) {
        // 避免在已生成的高亮 span 内部再匹配（用占位校验：跳过 < 开头的上下文）
        var before = str.slice(0, offset);
        if (before.lastIndexOf('>') > before.lastIndexOf('<')) return m;
        var core = g1 !== undefined ? g1 : m;
        if (rule.type === 'f') core = m.slice(0, -1);
        return '<span class="tok-' + rule.type + '">' + core + '</span>' + (rule.type === 'f' ? '(' : '');
      });
    });
    code.innerHTML = highlighted;
  });
})();
