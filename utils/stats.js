var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export function totalVolume(entries, timeframe, bridge = "") {
  let volume = 0;
  const filteredEntries = bridge.length
    ? entries.filter(function (entry) {
        return (
          entry.data.timestamp >= Date.now() / 1000 - timeframe * 60 * 60 &&
          entry.data.bridge == bridge
        );
      })
    : entries.filter(function (entry) {
        return entry.data.timestamp >= Date.now() / 1000 - timeframe * 60 * 60;
      });
  filteredEntries.map((entry) => (volume += entry.data.usd_value));
  return formatter.format(volume);
}
export function totalVolumeChange(entries, timeframe, bridge = "") {
  let volumeCurrent = 0;
  const filteredEntriesCurrent = bridge.length
    ? entries.filter(function (entry) {
        return (
          entry.data.timestamp >= Date.now() / 1000 - timeframe * 60 * 60 &&
          entry.data.bridge == bridge
        );
      })
    : entries.filter(function (entry) {
        return entry.data.timestamp >= Date.now() / 1000 - timeframe * 60 * 60;
      });
  filteredEntriesCurrent.map(
    (entry) => (volumeCurrent += entry.data.usd_value)
  );

  let volumeLast = 0;
  const filteredEntriesLast = bridge.length
    ? entries.filter(function (entry) {
        return (
          entry.data.timestamp >= Date.now() / 1000 - 2 * timeframe * 60 * 60 &&
          entry.data.timestamp < Date.now() / 1000 - timeframe * 60 * 60 &&
          entry.data.bridge == bridge
        );
      })
    : entries.filter(function (entry) {
        return (
          entry.data.timestamp >= Date.now() / 1000 - 2 * timeframe * 60 * 60 &&
          entry.data.timestamp < Date.now() / 1000 - timeframe * 60 * 60
        );
      });
  filteredEntriesLast.map((entry) => (volumeLast += entry.data.usd_value));
  console.log(Date.now() / 1000 - 2 * timeframe * 60 * 60);
  let change = (100 * (volumeCurrent - volumeLast)) / volumeLast;

  return change;
}

export function countTransactions(entries, timeframe, bridge = "") {
  let count = 0;
  const filteredEntries = bridge.length
    ? entries.filter(function (entry) {
        return (
          entry.data.timestamp >= Date.now() / 1000 - timeframe * 60 * 60 &&
          entry.data.bridge == bridge
        );
      })
    : entries.filter(function (entry) {
        return entry.data.timestamp >= Date.now() / 1000 - timeframe * 60 * 60;
      });

  filteredEntries.map((entry) => (count += 1));
  return count;
}
export function countTransactionsChange(entries, timeframe, bridge = "") {
  let countCurrent = 0;
  const filteredEntriesCurrent = bridge.length
    ? entries.filter(function (entry) {
        return (
          entry.data.timestamp >= Date.now() / 1000 - timeframe * 60 * 60 &&
          entry.data.bridge == bridge
        );
      })
    : entries.filter(function (entry) {
        return entry.data.timestamp >= Date.now() / 1000 - timeframe * 60 * 60;
      });

  filteredEntriesCurrent.map((entry) => (countCurrent += 1));

  let countLast = 0;
  const filteredEntriesLast = bridge.length
    ? entries.filter(function (entry) {
        return (
          entry.data.timestamp >= Date.now() / 1000 - 2 * timeframe * 60 * 60 &&
          entry.data.timestamp < Date.now() / 1000 - timeframe * 60 * 60 &&
          entry.data.bridge == bridge
        );
      })
    : entries.filter(function (entry) {
        return (
          entry.data.timestamp >= Date.now() / 1000 - 2 * timeframe * 60 * 60 &&
          entry.data.timestamp < Date.now() / 1000 - timeframe * 60 * 60
        );
      });

  filteredEntriesLast.map((entry) => (countLast += 1));

  let change = (100 * (countCurrent - countLast)) / countLast;
  return change;
}

export function checkInterval(
  entries,
  startTimestamp,
  endTimestamp,
  bridge = ""
) {
  console.log(bridge);
  const filteredEntries = bridge.length
    ? entries.filter(function (entry) {
        return (
          entry.data.timestamp * 1000 >= startTimestamp &&
          entry.data.timestamp * 1000 < endTimestamp &&
          entry.data.bridge == bridge
        );
      })
    : entries.filter(function (entry) {
        return (
          entry.data.timestamp * 1000 >= startTimestamp &&
          entry.data.timestamp * 1000 < endTimestamp
        );
      });

  let volume = 0;
  filteredEntries.map((entry) => (volume += entry.data.usd_value));

  return { count: filteredEntries.length, volume: formatter.format(volume) };
}
