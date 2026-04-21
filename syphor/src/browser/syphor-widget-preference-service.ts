import { inject, injectable, postConstruct } from "inversify";
import { PreferenceService } from "@theia/core/lib/common/preferences";
import { DisposableCollection } from "@theia/core/lib/common/disposable";
import { ISyphorService, SyphorService, SyphorServiceCredentials } from '../common/protocol';

@injectable()
export class SyphorWidgetPreferenceService {
  @inject(PreferenceService)
  protected readonly preferenceService: PreferenceService;

  @inject(SyphorService)
  protected readonly syphorService: ISyphorService;

  private readonly toDispose = new DisposableCollection();

  getTimeout(): number {
    return this.preferenceService.get("syphor.repl.timeout", 10000);
  }

  async setTimeout(value: number): Promise<void> {
    await this.preferenceService.set("syphor.repl.timeout", value);
  }

  getAutoRunStatus(): boolean {
    return this.preferenceService.get("syphor.repl.autoRun", false);
  }

  async setAutoRunStatus(status: boolean): Promise<void> {
    await this.preferenceService.set("syphor.repl.autoRun", status);
  }

  async setPassword(value: string): Promise<void> {
    await this.preferenceService.set("syphor.repl.password", value);
  }

  @postConstruct()
  protected init(): void {
    this.toDispose.push(
      this.preferenceService.onPreferenceChanged((event) => {
        if (event.preferenceName === "syphor.repl.timeout") {
          const newValue = this.preferenceService.get(
            "syphor.repl.timeout",
            10000,
          );
          console.log("Timeout changed to: ", newValue);
        }
        if (event.preferenceName === "syphor.repl.autoRun") {
          const newValue = this.preferenceService.get(
            "syphor.repl.autoRun",
            false,
          );
          console.log("Autorun changed to: ", newValue);
        }
        if (
          event.preferenceName === "syphor.repl.username" ||
          event.preferenceName === "syphor.repl.password" ||
          event.preferenceName === "syphor.repl.url"
        ) {
          const credentials: SyphorServiceCredentials = {
            username: this.preferenceService.get("syphor.repl.username", ""),
            password: this.preferenceService.get("syphor.repl.password", ""),
            url: this.preferenceService.get("syphor.repl.url", "bolt://localhost:7687"),
          };
          console.log("Preferences changed - updating backend credentials");
          void this.syphorService.initialize(credentials);
        }
      }),
    );
  }

  dispose(): void {
    this.toDispose.dispose();
  }
}
