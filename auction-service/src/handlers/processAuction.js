import { closeAuction } from "../lib/closeAuction";
import { getEndingAuctions } from "../lib/getEndingAuctions";
import createError from "http-errors";

async function processAuction(event, context) {
  try {
    const auctionsToClose = await getEndingAuctions();
    const closePromises = auctionsToClose.map((auction) =>
      closeAuction(auction)
    );
    await Promise.all(closePromises);
    return { closed: closePromises.length };
  } catch (error) {
    console.log(error);
    throw new createError.InternalServerError(error);
  }
}

export const handler = processAuction;
