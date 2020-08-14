export class Timer {
  private timerId: number;

  constructor(callback: TimerHandler ,interval: number) {
    this.timerId = setInterval(callback, interval);
  }

  public destroy() {
    clearInterval(this.timerId);
  }
}

export default Timer;