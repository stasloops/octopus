export const LayoutHeight = 72;

export interface IPage {
  key: string;
  label: string;
}
export const pageList: IPage[] = [
  { key: `/`, label: `Поиск по блоггерам` },
  { key: `/top`, label: `Поиск по ТОП блоггерам` },
  { key: `/audience-intersection`, label: `Персечение аудиторий` },
  { key: `/marketing-integrations`, label: `Маркетинговые интеграции` },
  { key: `/my-reports`, label: `Мои отчёты` },
];
