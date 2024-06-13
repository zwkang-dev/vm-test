import DetailMsg, { useFlowDescription } from "./components/DetailMsg";
import { Loading } from "tdesign-react";

import { observer } from 'mobx-react-lite'
import Publish from "./components/Publish";

// eslint-disable-next-line react-refresh/only-export-components
export default observer(function Page() {
  const { loading } = useFlowDescription();
  return <div>
    <Loading loading={loading} text="loading" />
    
    <DetailMsg />

    <Publish />
  </div>
})