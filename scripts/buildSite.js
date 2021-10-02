const fs = require("fs/promises");
const info = require("../data/distributor-info.json");

const main = async () => {
  await fs.rm("proofs/", { recursive: true });
  await fs.mkdir("proofs/", { recursive: true });
  await Promise.all(
    info.claims.map(async (claim) => {
      await Promise.all(
        Object.entries(claim).map(async ([k, v]) => {
          await fs.writeFile(`proofs/${k}.json`, JSON.stringify(v));
        })
      );
    })
  );
};

main().catch((err) => console.error(err));
