import { NextPage } from "next"
import ClusterInfo from "../components/dashboard/ClusterInfo";
import PersonalServiceAccount from "../components/dashboard/PersonalServiceAccount";
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
                className="grid sm:grid-cols-2 gap-4"
            >
                <div
                    className="w-full"
                >
                    <ClusterInfo />
                </div>
                <div
                    className="w-full"
                >
                    <PersonalServiceAccount />
                </div>

            </div>
        </div>
    )
}

export default Dashboard