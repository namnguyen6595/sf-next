import "server-only";
import { logger } from "@/logger";

function importAll(r) {
  let locales = {
    vi: {},
    en: {},
  };
  r.keys().forEach((key) => {
    const localeName = key.replace(`./`, "").replace(".json", "");
    const [, locale, fileNameWithExtension] = key.split("/");
    const fileName = fileNameWithExtension.replace(".json", "");
    locales[locale] = Object.assign(locales[locale], { [fileName]: r(key) });
  });
  return locales;
}

const localesContext = require.context("@/locales", true, /\.json$/);
const locales = importAll(localesContext);
export default function getResourceLocales(locale) {
  return locales[locale];
}
