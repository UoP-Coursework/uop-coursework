import Accordian from "~/components/Accordion";
import Layout from "~/components/Layout";

const FaqPage = () => {
  return (
    <Layout description="" emoji="">
      <div className="m-0 flex h-screen w-screen flex-col items-center">
        <h1 className="py-10 text-center text-6xl font-bold leading-tight tracking-tight text-slate-700 dark:text-slate-300">
          Frequently Asked Questions
        </h1>
        <div className="flex w-full flex-col items-center justify-center gap-8">
          <Accordian
            header="Where can I view my Carbon Footprint and Offset?"
            content="This can be seen by viewing your profile using the bottom left icon where you picture is displayed"
          />
          <Accordian
            header="What can I do to be more eco-friendly?"
            content={
              <>
                If possible:
                <ul className="list-disc pl-4">
                  <li>Purchase energy saving lightbulbs</li>
                  <li>
                    Use public transport / conventional vehicles as little as
                    possible
                  </li>
                  <li>Get to your destinations by walking or cycling</li>
                  <li>Recycle more</li>
                </ul>
              </>
            }
          />
          <Accordian
            header="Who are we?"
            content="We are a small group who care immensly about the environment. The reason for our platform is to spread awareness about the issues our planet currently faces and ways to improve this situation"
          />
          <Accordian
            header="What is the Carbon Leaderboard?"
            content="This feature allows you to compare your footprint and offset scores with other users. We believe adding some competition can be advantages to the environment."
          />
        </div>
      </div>
    </Layout>
  );
};

export default FaqPage;
