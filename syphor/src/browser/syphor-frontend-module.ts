import { ContainerModule } from "@theia/core/shared/inversify";
import {
  ServiceConnectionProvider,
  RemoteConnectionProvider,
} from "@theia/core/lib/browser";
import { CommandContribution } from '@theia/core';
import { MenuContribution } from '@theia/core';
import { PreferenceContribution } from '@theia/core/lib/common/preferences';
import {
  SyphorService,
  SyphorServicePath,
  ISyphorService,
} from "../common/protocol";
import { SyphorWidget } from './syphor-widget';
import { WidgetFactory } from '@theia/core/lib/browser';
import { SyphorPreferenceContribution, SyphorPreferenceSchema } from "./syphor-repl-preferences";
import { SyphorWidgetContribution } from './syphor-widget-contribution';
import { SyphorWidgetPreferenceService } from './syphor-widget-preference-service';

export default new ContainerModule((bind) => {
  console.log('syphor-frontend-module.ts loaded');
  bind(SyphorWidget).toSelf();

  bind(WidgetFactory).toDynamicValue(ctx => ({
    id: SyphorWidget.ID,
    createWidget: () => ctx.container.get(SyphorWidget)
  })).inSingletonScope();

  bind(SyphorWidgetContribution).toSelf().inSingletonScope();
  bind(CommandContribution).toService(SyphorWidgetContribution);
  bind(MenuContribution).toService(SyphorWidgetContribution);

  bind(SyphorService)
    .toDynamicValue((ctx) => {
      const connection = ctx.container.get<ServiceConnectionProvider>(
        RemoteConnectionProvider,
      );
      return connection.createProxy<ISyphorService>(SyphorServicePath);
    })
    .inSingletonScope();

  bind(SyphorPreferenceContribution).toConstantValue({
    schema: SyphorPreferenceSchema,
  });

  bind(PreferenceContribution).toService(SyphorPreferenceContribution);

  bind(SyphorWidgetPreferenceService).toSelf().inSingletonScope();

});
