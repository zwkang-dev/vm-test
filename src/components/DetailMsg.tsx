// import type { observe } from "mobx";
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { StoreContext } from '../App';

import { Button } from 'tdesign-react'


export function useFlowDescription() {
  const { flowModule } = useContext(StoreContext);
  // return flowModule.description;
  return {
    version: flowModule.version,
    releaseDate: flowModule.releaseDate,
    updateType: flowModule.updateType,
    description: flowModule.description,
    loadDetail: flowModule.loadDetail,
    loading: flowModule.loading,
    updateAt: flowModule.updateAt ?? '',
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default observer(function DetailMsg() {
  const { version, releaseDate, updateType, description, loadDetail, updateAt } = useFlowDescription();

  return <div>
    <Button onClick={() => loadDetail(1)}> load page </Button>
    <div>Version: {version}</div>
    <div>Release Date: {releaseDate}</div>
    <div>Update Type: {updateType}</div>
    <div>Description: {description}</div>
    <div>updateAt: {updateAt}</div>
  </div>
})