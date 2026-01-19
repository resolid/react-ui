export type Locale = {
  name: string;
  code: string;
  messages: {
    noData: string;
    closeButton: {
      label: string;
    };
    spinner: {
      loading: string;
    };
    pagination: {
      previous: string;
      next: string;
      pageOf: string;
    };
    tagsInput: {
      deleteTag: string;
    };
  };
};
