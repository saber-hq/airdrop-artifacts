const fs = require("fs/promises");
const info = require("../data/distributor-info.json");

const main = async () => {
  await fs.rm("site/", { recursive: true });
  await fs.mkdir("site/proofs/", { recursive: true });
  await fs.copyFile("index.html", "site/index.html");
  await fs.copyFile("data/airdrop-amounts.csv", "site/airdrop-amounts.csv");
  await fs.copyFile("data/distributor-info.json", "site/distributor-info.json");
  await Promise.all(
    info.claims.map(async (claim) => {
      await Promise.all(
        Object.entries(claim).map(async ([k, v]) => {
          await fs.writeFile(`site/proofs/${k}.json`, JSON.stringify(v));
        })
      );
    })
  );
};

main().catch((err) => console.error(err));
