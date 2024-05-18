"use client"
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthenticationContext";

const ProtectedRoute = ({ children }) => {
    const { adminAccessToken } = useAuth();
    const { loading } = useAuth();
    const router = useRouter();

    if (!adminAccessToken && !loading) {
        router.push("/admin"); // Redirect to login page if not logged in
        return null;
    }
    if (!loading) {
        return children; // Render protected route content if logged in
    }
};

export default ProtectedRoute;