export function durationFmt(ms: number): string {
  const totalSeconds = Math.floor(ms / 1e3);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);

  const hoursStr = hours.toString().padStart(2, '0');
  const minutesStr = minutes.toString().padStart(2, '0');
  const secondsStr = seconds.toString().padStart(2, '0');
  const msStr = ms.toString().slice(-3).padStart(3, '0');

  return `${hoursStr}:${minutesStr}:${secondsStr}:${msStr}`;
}
