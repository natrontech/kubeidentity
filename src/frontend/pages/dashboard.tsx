import { NextPage } from "next"
import { User, useUserContext } from "../contexts/userContext"

const Dashboard: NextPage = () => {

    const { user, loading, logoutUser }: any = useUserContext();

    const handleLogout = () => {
        logoutUser();
    }

    return (
        <div
            className=""
        >
            <h1>Dashboard</h1>
            {
                user && !loading ? (
                    <div>
                        <h2>{user.name}</h2>
                    </div>
                ) : (
                    <div>
                        <h2>Loading...</h2>
                    </div>
                )
            }
            <button
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    )
}

export default Dashboard