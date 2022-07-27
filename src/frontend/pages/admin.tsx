import { useRouter } from "next/router";
import { useEffect } from "react";
import AdminOverview from "../components/admin/AdminOverview";
import { useUserContext } from "../contexts/userContext";

const Admin = () => {

    const { user, loading }: any = useUserContext();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            if (!user.is_admin) {
                router.push("/");
            }
        }
    }), [user];

    return (
        <div>
            {
                user && !loading ?
                    user.is_admin ?
                        <AdminOverview />
                        :
                        null
                    :
                    null
            }
        </div>
    );
}

export default Admin;