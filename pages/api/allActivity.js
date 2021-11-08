import { client, q } from "@/utils/db";

export default async function handler(req, res) {
  const transfers = await client.query(
    q.Map(
      q.Paginate(q.Match(q.Index("all_transfers"))),
      q.Lambda((ts, ref) => q.Get(ref))
    )
  );

  res.status(200).json({ transfers });
}
