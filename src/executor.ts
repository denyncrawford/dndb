export default class Executor {
  private queue:any = [];
  private running:Boolean = false;

  public async add(method: Function, params:any) {
    return new Promise((res, rej) => {
      this.queue.push(async () => {
        const finished = await method(...params);
        res(finished);
        if (typeof finished === "undefined" || finished === null || finished) this.next();      
      });
      if(!this.running) this.next();
    })
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
