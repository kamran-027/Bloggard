import parser from "react-html-parser";

export const getContent = (html: string) => {
  return parser(html);
};
