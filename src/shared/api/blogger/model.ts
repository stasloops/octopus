export interface IBlogger {
  id_: string; // Логин / ID
  platform_code: string; // платформа
  login: null;
  title: string; // полное имя блогера
  description: string;
  gender: null;
  years: null;
  status: null;
  location: null;
  is_confirmed: boolean; // Аккаунт подтвержден
  subscribers: number; // Кол-во подписчиков
  er: number; // ER, %
  posts: number;
  attributes: null;
  id: number;
  url: string; // ссылка на блогера
  blogger: null;
  platform: null;
  theme: string;
  image: string; // Аватарка
  videos: null;
  clips: null;
  unsubscribe_perc: number; // Процент отписок
  external_links: null;
  tags: string[]; // Теги
}
