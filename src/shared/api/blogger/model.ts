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
  posts: number | number; // Колчество видео
  attributes: null;
  id: number;
  url: string; // ссылка на блогера
  blogger: null;
  platform: null;
  theme: number | string; // Тематика сообщества
  image: string; // Аватарка
  videos: number | null; // Колчество клипов
  clips: number | null; // Колчество постов
  unsubscribe_perc: number; // Процент отписок
  external_links: string[] | null; // ссылки на сотсети
  tags: string[]; // Теги
}
