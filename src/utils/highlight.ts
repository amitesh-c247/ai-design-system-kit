/**
 * Highlights matching text in a string by wrapping it with HTML tags
 * @param text - The text to search in
 * @param searchTerm - The term to highlight
 * @param highlightTag - The HTML tag to wrap highlighted text (default: 'mark')
 * @returns The text with highlighted matches
 */
const highlightText = (
  text: string,
  searchTerm: string,
  highlightTag: string = 'mark'
): string => {
  if (!searchTerm || !text) {
    return text;
  }

  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, `<${highlightTag}>$1</${highlightTag}>`);
};

export default highlightText; 