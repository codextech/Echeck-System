export interface Config {
    searchEnabled: boolean;
    headerEnabled: boolean;
    orderEnabled: boolean;
    orderEventOnly?: boolean;
    globalSearchEnabled: boolean;
    paginationEnabled: boolean;
    exportEnabled: boolean;
    clickEvent: boolean;
    selectRow: boolean;
    selectCol: boolean;
    selectCell: boolean;
    rows: number;
    additionalActions: boolean;
    serverPagination: boolean;
    isLoading: boolean;
    detailsTemplate: boolean;
    groupRows: boolean;
    paginationRangeEnabled: boolean;
    collapseAllRows: boolean;
    checkboxes: boolean;
    resizeColumn: boolean;
    fixedColumnWidth: boolean;
    horizontalScroll: boolean;
    draggable: boolean;
    logger: boolean;
    showDetailsArrow?: boolean;
    showContextMenu?: boolean;
    persistState?: boolean;
    paginationMaxSize?: number;
    tableLayout: {
      style: STYLE | string,
      theme: THEME | string,
      borderless: boolean,
      hover: boolean,
      striped: boolean,
    };
  }

  export enum STYLE {
    TINY = 'tiny',
    BIG = 'big',
    NORMAL = 'normal',
  }

  export enum THEME {
    LIGHT = 'light',
    DARK = 'dark',
  }
