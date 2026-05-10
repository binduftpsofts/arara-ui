document.addEventListener('DOMContentLoaded', () => {
  const codeBlocks = document.querySelectorAll('.code-block');

  // ------------------------------------------------------------------
  // Language detection
  // ------------------------------------------------------------------
  function getLanguage(label) {
    const l = label.toLowerCase();
    if (l.includes('html')) return 'html';
    if (l.includes('css')) return 'css';
    if (l.includes('javascript') || l.includes('js')) return 'javascript';
    if (l.includes('json')) return 'json';
    if (l.includes('scss') || l.includes('sass')) return 'scss';
    if (l.includes('bash') || l.includes('sh')) return 'bash';
    return 'text';
  }

  // ------------------------------------------------------------------
  // Escape helper (ONLY ONCE)
  // ------------------------------------------------------------------
  function escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ------------------------------------------------------------------
  // Patterns
  // ------------------------------------------------------------------
  const patterns = {
    html: [
      { regex: /(&lt;!--[\s\S]*?--&gt;)/gi, class: 'comment' },
      { regex: /(&lt;\/?[a-z][a-z0-9]*)/gi, class: 'tag' },
      { regex: /([a-z-]+)(?==&quot;|=')/gi, class: 'attr' },
      { regex: /(&quot;[\s\S]*?&quot;|'[\s\S]*?')/g, class: 'string' },
      { regex: /(&lt;![A-Z]+)/gi, class: 'doctype' }
    ],

    css: [
      { regex: /([.#]?[a-z-][a-z0-9-]*)(?=\s*\{)/gi, class: 'selector' },
      { regex: /([a-z-]+)(?=\s*:)/gi, class: 'property' },
      { regex: /(:[\s]*[^;{}]+)(?=;|\})/gi, class: 'value' },
      { regex: /(#[\da-fA-F]{3,6}|rgba?\([^)]+\))/g, class: 'color' },
      { regex: /(\/\*[\s\S]*?\*\/)/g, class: 'comment' },
      { regex: /(@[a-z-]+)/gi, class: 'atrule' }
    ],

    javascript: [
      { regex: /\b(function|return|if|else|for|while|const|let|var|class|export|default|new|this|typeof|instanceof|try|catch|finally)\b/g, class: 'keyword' },
      { regex: /(\/\*[\s\S]*?\*\/|\/\/.*$)/gm, class: 'comment' },
      { regex: /(".*?"|'.*?'|`.*?`)/g, class: 'string' },
      { regex: /\b(\d+\.?\d*|0x[\da-fA-F]+)\b/g, class: 'number' },
      { regex: /\b(true|false|null|undefined)\b/g, class: 'boolean' },
      { regex: /([a-z_$][a-z0-9_$]*)\s*(?=\()/gi, class: 'function' }
    ],

    json: [
      { regex: /(".*?")(\s*:)/g, class: 'key' },
      { regex: /(".*?"|'.*?')/g, class: 'string' },
      { regex: /\b(\d+\.?\d*)\b/g, class: 'number' },
      { regex: /\b(true|false|null)\b/g, class: 'boolean' },
      { regex: /(\/\*[\s\S]*?\*\/|\/\/.*$)/gm, class: 'comment' }
    ],

    scss: [
      { regex: /(\/\*[\s\S]*?\*\/|\/\/.*$)/gm, class: 'comment' },
      { regex: /(\$[a-z-][a-z0-9_-]*)/gi, class: 'variable' },
      { regex: /(@include|@mixin|@extend|@import|@use|@forward)\b/gi, class: 'keyword' },
      { regex: /([.#]?[a-z-][a-z0-9-]*)(?=\s*\{)/gi, class: 'selector' },
      { regex: /([a-z-]+)(?=\s*:)/gi, class: 'property' },
      { regex: /(:[\s]*[^;{}]+)(?=;|\})/gi, class: 'value' }
    ],

    bash: [
      { regex: /(#.*$)/gm, class: 'comment' },
      { regex: /(".*?"|'.*?'|`.*?`)/g, class: 'string' },
      { regex: /(\$[a-zA-Z_][a-zA-Z0-9_]*|\$\{.*?\})/g, class: 'variable' },
      { regex: /(?<=^|\s)(-{1,2}[a-zA-Z0-9-]+)(?=\s|$)/g, class: 'flag' },
      { regex: /\b(if|then|else|fi|for|while|do|done|case|esac|function|return|exit)\b/g, class: 'control' },
      { regex: /\b(cd|ls|pwd|cat|echo|mkdir|rm|cp|mv|touch|chmod|chown|alias|unalias|export|source|sudo)\b/g, class: 'builtin' },
      { regex: /\b(npm|npx|yarn|pnpm|pip|pip3|gem|cargo|brew|apt|apt-get|yum|dnf|pacman)\b/g, class: 'package' },
      { regex: /\b(install|uninstall|update|upgrade|remove|run|build|start|dev|test|init|add|create)\b/g, class: 'command' },
      { regex: /\b(node|python|ruby|go|rustc|docker|kubectl|helm|terraform|ansible)\b/g, class: 'tool' },
      { regex: /\b(grep|awk|sed|find|xargs|sort|uniq|cut|tr|tee|jq)\b/g, class: 'utility' },
      { regex: /\b(\d+)\b/g, class: 'number' },
        { regex: /(\||&&|\|\||\>\>|\<\<)/g, class: 'operator' }
    ]
  };

  // ------------------------------------------------------------------
  // Generic highlighter
  // ------------------------------------------------------------------
  function highlightWithPatterns(text, langPatterns) {
    let highlighted = escapeHTML(text);

    for (const { regex, class: cls } of langPatterns) {
      highlighted = highlighted.replace(regex, (match) => {
        if (match.includes('<span')) return match;
        return `<span class="token ${cls}">${match}</span>`;
      });
    }

    // console.log(highlighted)
    return highlighted;
  }

  // ------------------------------------------------------------------
  // Bash (same engine, no special escaping)
  // ------------------------------------------------------------------
  function highlightBash(text) {
    const escaped = text.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    const patternList = patterns.bash;
    const groups = patternList.map((p) => `((?:${p.regex.source}))`);
    const combinedRegex = new RegExp(groups.join('|'), 'gm');

    const result = escaped.replace(combinedRegex, (...args) => {
      let matchedIndex = -1;
      for (let i = 1; i <= patternList.length; i++) {
        if (args[i] !== undefined) {
          matchedIndex = i - 1;
          break;
        }
      }
      if (matchedIndex === -1) return args[0];
      const tokenClass = patternList[matchedIndex].class;
      return `<span class="token ${tokenClass}">${args[0]}</span>`;
    });

    return result;
  }

  // ------------------------------------------------------------------
  // Main dispatcher
  // ------------------------------------------------------------------
  function detectLanguageFromContent(text) {
    const t = text.trim();
    if (!t) return null;
    const low = t.toLowerCase();
    if (/^\s*(&lt;|<)\/?[a-z]/.test(t) || /&lt;[a-z]+\b/.test(t)) return 'html';
    if (/^[\s{\[]/.test(t) && /:\s/.test(t)) return 'json';
    if (/\$[a-z0-9_-]+|@mixin|@include|\.[a-z0-9_-]+\s*\{/.test(low)) return 'scss';
    if (/\b(function|const|let|var|=>|console\.|document\.|window\.)\b/.test(low)) return 'javascript';
    if (/^[\w.+-]+\s+(install|run|build|start|echo|cat|npm|git)\b/.test(low) || /\b(sudo|apt-get|npm|yarn|pip)\b/.test(low)) return 'bash';
    if (/\.[a-z0-9_-]+\s*\{/.test(low) || /:\s*[^;]+;/.test(low)) return 'css';
    return null;
  }

  const labelMap = {
    html: 'HTML',
    css: 'CSS',
    javascript: 'JavaScript',
    json: 'JSON',
    scss: 'SCSS',
    bash: 'bash'
  };
  function highlightCode(rawText, language) {
    switch (language) {
      case 'html':
        return highlightWithPatterns(rawText, patterns.html);
      case 'css':
        return highlightWithPatterns(rawText, patterns.css);
      case 'javascript':
        return highlightWithPatterns(rawText, patterns.javascript);
      case 'json':
        return highlightWithPatterns(rawText, patterns.json);
      case 'scss':
        return highlightWithPatterns(rawText, patterns.scss);
      case 'bash':
        return highlightWithPatterns(rawText, patterns.bash);
      default:
        return escapeHTML(rawText);
    }
  }

  // ------------------------------------------------------------------
  // Apply to blocks
  // ------------------------------------------------------------------
  codeBlocks.forEach(block => {
    const header = block.querySelector('.code-header');
    const labelElem = header?.querySelector('.code-label');
    const body = block.querySelector('.code-body pre code');
    if (!header || !labelElem || !body) return;

    const rawSource = body.textContent || '';
    const labelLang = getLanguage(labelElem.innerText);
    const contentLang = detectLanguageFromContent(rawSource) || labelLang;

    // Update the visible label to match the content when detected
    if (contentLang && labelMap[contentLang]) {
      labelElem.innerText = labelMap[contentLang];
    }

    body.innerHTML = highlightCode(rawSource, contentLang);

    // UI actions
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'code-actions';
    header.replaceChild(actionsDiv, labelElem);
    actionsDiv.appendChild(labelElem);

    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.type = 'button';
    copyBtn.title = 'Copy to clipboard';
    copyBtn.setAttribute('aria-label', 'Copy to clipboard');
    const copySvg = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><rect x="3" y="3" width="11" height="11" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>';
    const checkSvg = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>';
    copyBtn.innerHTML = copySvg;

    actionsDiv.appendChild(copyBtn);

    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(rawSource);
        copyBtn.classList.add('copied');
        copyBtn.innerHTML = checkSvg;
        copyBtn.title = 'Copied';
        copyBtn.setAttribute('aria-label', 'Copied');
        setTimeout(() => {
          copyBtn.classList.remove('copied');
          copyBtn.innerHTML = copySvg;
          copyBtn.title = 'Copy to clipboard';
          copyBtn.setAttribute('aria-label', 'Copy to clipboard');
        }, 1500);
      } catch (err) {
        console.error('Clipboard write failed', err);
      }
    });
  });
});