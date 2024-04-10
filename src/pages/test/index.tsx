import { useRouter } from "next/router";
import Layout from "~/components/Layout";

const testPage = () => {
    const router = useRouter();


    return (
        <Layout description="" emoji="">
            <div className="m-0 h-screen w-screen p-0 text-center text-white">
                <button   
                    onClick={() => router.push("test/changeUserInfo")}
                >changeUserInfo</button>
                <br/>
                <button   
                    onClick={() => router.push("test/changeUsername")}
                >changeUsername</button>
                <br/>
                <button   
                    onClick={() => router.push("test/getUserInfo")}
                >getUserInfo</button>
                
            </div>
        </Layout>

    )
};

export default testPage;