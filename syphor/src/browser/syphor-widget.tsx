import * as React from "react";
import {
  injectable,
  postConstruct,
  inject,
} from "@theia/core/shared/inversify";
import { AlertMessage } from "@theia/core/lib/browser/widgets/alert-message";
import { ReactWidget } from "@theia/core/lib/browser/widgets/react-widget";
import { MessageService } from "@theia/core";
import { Message } from "@theia/core/lib/browser";
import { SyphorWidgetPreferenceService } from "./syphor-widget-preference-service";
import { SyphorService, ISyphorService } from "../common/protocol";

const syphorInputWidget = (self: SyphorWidget, header: string) => (
  <div id="widget-container">
    <AlertMessage type="INFO" header={header} />
    <textarea
      id="cypher-input"
      style={{ width: "100%", height: "120px" }}
      placeholder="MATCH (n) RETURN n LIMIT 10"
    />

    <button className="theia-button primary" onClick={async () => self.runQuery()}>
      Run Query
    </button>
    <pre style={{ marginTop: "10px", whiteSpace: "pre-wrap" }}>
      {self.syphorOutput}
    </pre>
  </div>
);

@injectable()
export class SyphorWidget extends ReactWidget {
  syphorOutput: string = "";

  static readonly ID = "syphor:widget";
  static readonly LABEL = "Cypher Repl";

  @inject(MessageService)
  protected readonly messageService!: MessageService;

  @inject(SyphorWidgetPreferenceService)
  protected readonly preferences!: SyphorWidgetPreferenceService;

  @inject(SyphorService)
  protected readonly syphorService!: ISyphorService;

  @postConstruct()
  protected init(): void {
    this.doInit();
  }

  protected async doInit(): Promise<void> {
    this.id = SyphorWidget.ID;
    this.title.label = SyphorWidget.LABEL;
    this.title.caption = SyphorWidget.LABEL;
    this.title.closable = true;
    this.title.iconClass = "fa fa-window-maximize"; // example widget icon.
    this.update();
  }

  render(): React.ReactElement {
    const header = `Widget Repl`;
    return syphorInputWidget(this, header);
  }

  async displayMessage(): Promise<void> {
    console.log("---DISPLAY MESSAGE---");
    const autoRunStatus = this.preferences.getAutoRunStatus();
    const message = `Cypher Repl created with auto-run: ${autoRunStatus}`;
    const query = (
      document.getElementById("cypher-input") as HTMLTextAreaElement
    ).value;
    const result = await this.syphorService.runQuery(query);
    this.messageService.info(message);
    console.log(`RESULT: ${result}`);
  }

  protected onActivateRequest(msg: Message): void {
    super.onActivateRequest(msg);
    const htmlElement = document.getElementById("displayMessageButton");
    if (htmlElement) {
      htmlElement.focus();
    }
  }

  async runQuery(): Promise<void> {
    console.log("SyphorWidget.runQuery");
    try {
      const input = (document.getElementById('cypher-input') as HTMLTextAreaElement)?.value ?? '';

      const result = await this.syphorService.runQuery(
        input,
      );

      this.syphorOutput = JSON.stringify(result, null, 2);

      this.update();
    } catch (err) {
      console.error("Error in runQuery: ", err);
      this.messageService.error(`Query failed: ${err}`);
    }
  }
}
