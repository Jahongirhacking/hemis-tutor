export interface IStoryData {
  id: number;
  title: string;
  caption?: string;
  content: string;
  link?: string;
  created_at: string;
  expire_date: string;
  button_text?: string;
  content_preview?: string;
  content_type: 'photo' | 'video';
}
