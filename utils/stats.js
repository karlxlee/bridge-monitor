var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
export function totalVolume(entries, timeframe) {
  let volume = 0;
  const filteredEntries = entries.filter(function (entry) {
    return entry.data.timestamp >= Date.now() / 1000 - timeframe * 60 * 60;
  });
  filteredEntries.map((entry) => (volume += entry.data.usd_value));
  return formatter.format(volume);
}
export function countTransactions(entries, timeframe) {
  let count = 0;
  const filteredEntries = entries.filter(function (entry) {
    return entry.data.timestamp >= Date.now() / 1000 - timeframe * 60 * 60;
  });
  filteredEntries.map((entry) => (count += 1));
  return count;
}
export function checkInterval(entries, startTimestamp, endTimestamp) {
  const filteredEntries = entries.filter(function (entry) {
    return (
      entry.data.timestamp * 1000 >= startTimestamp &&
      entry.data.timestamp * 1000 < endTimestamp
    );
  });
  let volume = 0;
  filteredEntries.map((entry) => (volume += entry.data.usd_value));

  return { count: filteredEntries.length, volume: formatter.format(volume) };
}
