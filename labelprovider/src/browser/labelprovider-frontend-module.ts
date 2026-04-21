/**
 * Generated using theia-extension-generator
 */
import { LabelProviderContribution } from "@theia/core/lib/browser";
import { ContainerModule } from "@theia/core/shared/inversify";
import { LabelproviderLabelProviderContribution } from './labelprovider-contribution';
import '../../src/browser/style/example.css';

export default new ContainerModule(bind => {
    bind(LabelProviderContribution).to(LabelproviderLabelProviderContribution);
});
