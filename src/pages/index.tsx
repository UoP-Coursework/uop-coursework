import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout description="" emoji="🦊">
      <div className="m-0 h-screen w-screen p-0">
        <h1 className="pt-10 text-center text-4xl font-bold leading-tight tracking-tight text-slate-300 md:text-5xl">
          <span>Find your closest </span>
          <span className="bg-gradient-to-r from-yellow-600 via-orange-400 to-orange-500 bg-clip-text text-transparent">
            Recycling Plant
          </span>
          <span> with us</span>
        </h1>
      </div>
    </Layout>
  );
}
