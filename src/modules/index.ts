import { FlowModule } from "./flow-modules";
import { publishModules } from "./publish-modules";


export const stores = {
  flowModule: new FlowModule(),
  publishModules: new publishModules()
}