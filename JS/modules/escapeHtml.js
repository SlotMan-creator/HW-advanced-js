export function escapeHtml(html) {
    if (typeof html !== 'string') {
        return ''
    }
    return html
        .replaceAll(/&/g, '&amp;')
        .replaceAll(/</g, '&lt;')
        .replaceAll(/>/g, '&gt;')
        .replaceAll(/"/g, '&quot;')
        .replaceAll(/'/g, '&#39;')
}
