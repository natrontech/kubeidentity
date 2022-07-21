import { NextPage } from "next"
import ClusterInfo from "../components/dashboard/ClusterInfo";
import { User, useUserContext } from "../contexts/userContext"

const Dashboard: NextPage = () => {

    const { user, loading, logoutUser }: any = useUserContext();

    const handleLogout = () => {
        logoutUser();
    }

    return (
        <div
            className="sm:px-20 p-5"
        >
            <div
                className="sm:w-4/6 m-auto"
            >
                <ClusterInfo />
            </div>
            <div
                className="grid sm:grid-cols-3 gap-4"
            >


            </div>
        </div>
    )
}

export default Dashboard