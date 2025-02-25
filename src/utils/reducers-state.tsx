export interface Action<T> {
  type: T;
}
export interface NewsType {
  title: string | undefined;
  id: number | null;
  userId: number | null;
  body: string;
}

interface StateType {
  queryID: number;
  News: NewsType;
  viewNews: NewsType;
  loader: boolean;
}

export const initialState: StateType = {
  queryID: 1,
  News: {
    title: undefined,
    id: null,
    userId: null,
    body: null!,
  },
  viewNews: {
    title: undefined,
    id: null,
    body: "",
    userId: null,
  },
  loader: true,
};

export interface StateAction extends Action<"ALL-NEWS" | "QUERY-ID"> {
  payload: {
    queryID: 1;
    News: NewsType;
    viewNews: NewsType;
    loader: true;
  };
}

export const reducer = (
  state: StateType,
  action: any | StateAction
): StateType => {
  // eslint-disable-next-line
  switch (action.type) {
    case "ALL-NEWS":
      return { ...state, News: action.payload };
    case "QUERY-ID":
      return { ...state, queryID: action.payload };
    case "GET-NEWS":
      return { ...state, viewNews: action.payload };
    case "LOADER":
      return { ...state, loader: action.payload };
    default:
      return state;
  }
};
