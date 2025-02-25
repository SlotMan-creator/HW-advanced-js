export function escapeHtml(html) {
    if (typeof html !== 'string') {
        return ''
    }
    return html
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;')
}

// чтобы не взломали
