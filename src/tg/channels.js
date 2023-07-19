import tg_channels from "../../config/tg_channels.js";

/**
 * @returns {(string)[]}
 */
export function getCryptoChannelIds() {
    return Object.values(tg_channels.crypto);
}