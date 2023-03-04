import { useEffect, useState } from "react";

type QueryParams = {
  name: string;
  lobby: string;
}
export enum QueryParamsStatus {
  Loading = 1,
  Error,
}

export const useQueryParams = (): QueryParams | QueryParamsStatus => {
  const [searchParams, setSearchParams] = useState<URLSearchParams | undefined>();

  useEffect(() => {
    setSearchParams(new URLSearchParams(window.location.search));
  }, []);

  if (!searchParams) { return QueryParamsStatus.Loading; }

  const name = searchParams.get('name');
  const lobby = searchParams.get('lobby');

  return (name && lobby) ? { name, lobby } : QueryParamsStatus.Error;
}
