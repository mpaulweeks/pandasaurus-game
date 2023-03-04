import { QueryParamsStatus, useQueryParams } from "@/hooks/useQueryParams";

const LobbyPage = (props: {
  name: string;
  lobby: string;
}) => {
  return (
    <div>
      lobby! {props.name} {props.lobby}
    </div>
  )
}

const LobbyCheck = () => {
  const params = useQueryParams();
  if (params === QueryParamsStatus.Loading) {
    return <div>loading...</div>
  }
  if (params === QueryParamsStatus.Error) {
    return <div>missing lobby info!</div>
  }
  // else
  return <LobbyPage {...params} />
}

export default LobbyCheck;
