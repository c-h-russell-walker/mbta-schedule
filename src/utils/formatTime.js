
export const formatTime = (time) => {
  return time.toLocaleString(
    'en-US',
    {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        // Since we're always concerned with Boston we know the timezone
        timeZone: 'America/New_York',
    }
  );
};
