export const LayoutHeight = 72;

export interface IPage {
  key: string;
  label: string;
}
export const pageList: IPage[] = [
  { key: `/`, label: `Поиск по блогерам` },
  { key: `/audience-intersection`, label: `Персечение аудиторий` },
  { key: `/marketing-integrations`, label: `Поиск по маркетинговым интеграциям` },
  { key: `/upload-bloggers`, label: `Загрузка блогеров` },
];
