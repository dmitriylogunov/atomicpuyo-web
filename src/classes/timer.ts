export class Timer {
  private timerRef: number;

  constructor(callback: TimerHandler ,interval: number) {
    this.timerRef = setInterval(callback, interval);
  }

  public destroy() {
    clearInterval(this.timerRef);
  }
}

export default Timer;