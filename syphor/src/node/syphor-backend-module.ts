import { ContainerModule } from "@theia/core/shared/inversify";
import { ConnectionHandler, RpcConnectionHandler } from "@theia/core";
import {
  SyphorService,
  SyphorServicePath,
  ISyphorService,
} from "../common/protocol";
import { SyphorServiceImpl } from "./syphor-service";

export default new ContainerModule((bind) => {
  // Bind implementation to token
  bind(SyphorService).to(SyphorServiceImpl).inSingletonScope();

  // Expose it over RPC
  bind(ConnectionHandler)
    .toDynamicValue(
      (ctx) =>
        new RpcConnectionHandler<ISyphorService>(SyphorServicePath, () => {
          return ctx.container.get<ISyphorService>(SyphorService);
        }),
    )
    .inSingletonScope();
});
