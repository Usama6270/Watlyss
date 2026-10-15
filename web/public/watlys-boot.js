/* Runs before paint — theme + language (no React). */
(function () {
  try {
    var root = document.documentElement

    /* Theme */
    var storedTheme = localStorage.getItem('watlys-theme')
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    var dark =
      storedTheme === 'dark' || (storedTheme !== 'light' && prefersDark)
    if (dark) root.classList.add('dark')
    else root.classList.remove('dark')
    root.style.colorScheme = dark ? 'dark' : 'light'
    var meta = document.querySelector('meta[name="theme-color"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'theme-color')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', dark ? '#0B2A4A' : '#F7FBFE')

    /* Language */
    var lang = localStorage.getItem('watlys_lang')
    if (lang !== 'en' && lang !== 'ur') {
      var m = document.cookie.match(/(?:^|; )watlys_lang=(en|ur)(?:;|$)/)
      lang = m ? m[1] : 'en'
    }
    root.lang = lang
    root.dir = lang === 'ur' ? 'rtl' : 'ltr'
    root.dataset.locale = lang
    if (lang === 'ur') root.classList.add('font-urdu')
    else root.classList.remove('font-urdu')
  } catch (e) {}
})()
