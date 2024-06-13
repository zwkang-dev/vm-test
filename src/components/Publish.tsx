import { observer } from "mobx-react-lite";
import { useFlowDescription } from "./DetailMsg";
import { useContext } from "react";
import { StoreContext } from "../App";
import { Button, MessagePlugin } from "tdesign-react";


function usePublishAction() {
  const { loading } = useFlowDescription();
  const { publishModules } = useContext(StoreContext);

  async function publish() {
    // publishModules.publish();
    if(loading) {
      MessagePlugin.warning('正在加载中');
      return;
    }

    await publishModules.publishAction({});
  }

  return {
    publish,
    loading: publishModules.loading
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default observer(function (){
  const { loading, publish } = usePublishAction();
  const text = loading ? '发布中' : '发布按钮'

  return <Button disabled={loading} onClick={publish}>
    {text}
  </Button>
})