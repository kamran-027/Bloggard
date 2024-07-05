export interface IBlog {
  title: string;
  content: string;
  id: string;
  publishedDate: string;
  author: {
    name: string | null;
  };
}
