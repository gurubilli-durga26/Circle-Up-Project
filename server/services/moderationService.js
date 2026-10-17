export function moderateText(text){const blocked=["spam"];return !blocked.some(word=>String(text).toLowerCase().includes(word));}
