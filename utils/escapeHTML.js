// Перетворити потенційно небезпечні символи у безпечні HTML-сутності, щоб вставляти текст у innerHTML без ризику виконання коду
export const escapeHTML = (str) =>
    str.replace(/[&<>"']/g, (tag) => {
        const htmlEntities = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
        };

        return htmlEntities[tag];
    });