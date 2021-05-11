import type { DbResults } from "./types.ts";

export default class Executor {
  private queue: ((() => Promise<void> | void) | undefined)[] = [];
  private running = false;

  public add<
    // deno-lint-ignore no-explicit-any
    Args extends readonly any[],
    F extends (...args: Args) => Promise<DbResults>,
  >(
    method: F,
    params: Args,
  ) {
    return new Promise<DbResults>((res) => {
      this.queue.push(async () => {
        res(await method(...params));
        this.next();
      });
      if (!this.running) this.next();
    });
  }

  public async next() {
    this.running = false;
    const execute = this.queue.shift();
    if (execute) {
      this.running = true;
      await execute();
    }
  }
}
