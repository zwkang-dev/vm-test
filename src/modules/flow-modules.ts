import { makeAutoObservable, observable, computed } from "mobx"
import { mockDelay } from "../utils"

const mockData = {
  id: 1,
  ext: {
    updateType: 'major',
    version: '1.0.0',
    description: 'Initial release',
    releaseDate: '2021-09-01',
    updateAt: new Date().toString()
  },
  author: 'zwkang',
  task: 'Initial release',
}

type FlowModuleExt = {
  version: string,
  releaseDate: string,
  updateType: string,
  description: string
  updateAt: string
}


export class FlowModule {
  id = null as number | null
  ext = null as null | FlowModuleExt
  task = '' as string
  author = null as string | null
  loading = false as boolean

  constructor() {
    makeAutoObservable(this, {
      id: observable,
      ext: observable,
      task: observable,
      author: observable,
      loading: observable,

      version: computed,
      releaseDate: computed,
      updateType: computed,
      description: computed,
      updateAt: computed,
    });
  }

  loadDetail = async (id: number) => {
    this.loading = true;
    console.log(id)
    await mockDelay(3000);
    this.loading = false;

    this.id = mockData.id;
    this.ext = mockData.ext;
    this.task = mockData.task;
    this.author = mockData.author;

    this.ext.updateAt = new Date().toString();
  }

  reset() {
    this.id = null;
    this.ext = null;
    this.task = '';
    this.author = null;
    this.loading = false;
  }

  get version() {
    return this.ext?.version || '';
  }

  get releaseDate() {
    return this.ext?.releaseDate || '';
  }

  get updateType() {
    return this.ext?.updateType || '';
  }

  get description() {
    return this.ext?.description || '';
  }

  get updateAt() {
    return this.ext?.updateAt || '';
  }

  buildSaveParams() {
    return {
      id: this.id,
      ext: this.ext,
      task: this.task,
    }
  }
}