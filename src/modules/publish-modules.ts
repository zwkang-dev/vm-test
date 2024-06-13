
import { makeAutoObservable, observable, computed } from "mobx"
import { mockDelay } from "../utils"


export class publishModules {
  loading: boolean = false;


  constructor() {
    makeAutoObservable(this, {
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  publishAction = async (data:Record<string,any>) =>{
    this.loading = true;
    await mockDelay(3000);
    console.log(data);
    this.loading = false;
  }

  reset() {
  }

}