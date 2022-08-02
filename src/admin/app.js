import FetchSiteButton from "./extensions/components/FetchSiteButton";
import LoadHTMLForEmptyPagesButton from "./extensions/components/LoadHTMLForEmptyPagesButton";

const config = {
  locales: [
    // 'ar',
    // 'fr',
    // 'cs',
    // 'de',
    // 'dk',
    // 'es',
    // 'he',
    // 'id',
    // 'it',
    // 'ja',
    // 'ko',
    // 'ms',
    // 'nl',
    // 'no',
    // 'pl',
    // 'pt-BR',
    // 'pt',
    // 'ru',
    // 'sk',
    // 'sv',
    // 'th',
    // 'tr',
    // 'uk',
    // 'vi',
    // 'zh-Hans',
    // 'zh',
  ],
};

const bootstrap = (app) => {
  app.injectContentManagerComponent("editView", "right-links", {
    name: "FetchSiteButton",
    Component: FetchSiteButton,
  });
  app.injectContentManagerComponent("editView", "right-links", {
    name: "LoadHTMLForEmptyPages",
    Component: LoadHTMLForEmptyPagesButton,
  });
};

export default {
  config,
  bootstrap,
};
