import { InjectionZone } from "@strapi/helper-plugin";

const HomePage = () => {
  console.log("SOMEBODY IS HAPPENEd");

  return (
    <main>
      <h1>This is the homepage!!!!!!!!!!!!!!!!!!!!!!!!!!!</h1>
      <InjectionZone area="thief-parser.homePage.right" />
    </main>
  );
};
