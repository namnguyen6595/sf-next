import { TranslationContext } from "@/app/translation";
import { logger } from "@/logger";
import { useContext } from "react";

function useTranslation() {
  const translationContext = useContext(TranslationContext);
  const { locale, lang } = translationContext;

  const getTextByPath = (url: string, obj?: any): string => {
    const parts = url.split(".");
    if (parts.length === 1) {
      return obj ? obj[parts[0]] : "";
    } else {
      return  getTextByPath(parts.slice(1).join("."), obj[parts[0]]);
    }
  };

  const t = (path: string): string => {
    const listDestination = path.split(".");
    const objDestination = locale[listDestination[0]];
    return (
      getTextByPath(listDestination.slice(1).join("."), objDestination) || path
    );
  };
  return {
    t,
    lang,
  };
}

export default useTranslation;
