const faunadb = require("faunadb");
export const q = faunadb.query;

const { CreateIndex, Collection } = q;

export const client = new faunadb.Client({
  secret: process.env.FAUNA_ADMIN_KEY,
});

const CreateIndexAllTransfers = CreateIndex({
  name: "all_transfers",
  source: Collection("transfers"),
  // this is the default collection index, no terms or values are provided
  // which means the index will sort by reference and return only the reference.
  values: [
    // By including the 'created' we order them by time.
    // We could have used ts but that would have updated by 'updated' time instead.
    {
      field: ["data", "timestamp"],
      reverse: true,
    },
    {
      field: ["ref"],
    },
  ],
});

if (q.Select("active", q.Get(q.Index("all_transfers")))) {
} else {
  client.query(CreateIndexAllTransfers);
}
