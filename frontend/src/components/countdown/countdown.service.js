
export function startCountdown(deadline, onTime, onEnd, frequency = 250) {
  deadline = typeof deadline === 'string' ? (new Date(deadline)).getTime() : deadline;
  const deadlineTime = deadline instanceof Date ? deadline.getTime() : deadline;
  const timer = setInterval(() => {
    const timeLeft = deadlineTime - Date.now();
    if (timeLeft > 0) {
      return onTime(timeLeft);
    }
    stopCountdown(timer);
    return onEnd();
  }, frequency);
}

export function stopCountdown(countdown) {
  if (countdown) {
    clearInterval(countdown);
  }
}