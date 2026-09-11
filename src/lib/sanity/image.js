import createImageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

export function urlFor(source) {
  if (!source) {
    return null;
  }

  return builder.image(source);
}

/**
 * Resolves any Sanity image shape (raw asset ref, "assetUrl" projection,
 * "asset.url" projection, or a plain string) to a usable string URL.
 * Use this instead of re-deriving fallback chains per component.
 */
export function getImageUrl(source, { width, height } = {}) {
  if (!source) return null;
  if (typeof source === "string") return source;

  const direct = source.assetUrl || source.asset?.url || source.url || null;
  if (direct && !width && !height) return direct;

  if (source.asset?._ref || source.asset?._id) {
    try {
      let img = urlFor(source);
      if (width) img = img.width(width);
      if (height) img = img.height(height);
      return img.auto("format").url();
    } catch {
      return direct;
    }
  }

  return direct;
}