"use client"
import AdminSignin from "@/components/adminSignin";
import { useRouter } from "next/navigation";
import React, { Suspense } from "react";
import { useAuth } from "@/context/AuthenticationContext";
import toast from "react-hot-toast";
import Loading from '@/app/admin/loading';

export default function AdminPage() {

	const [isLoading, setIsLoading] = React.useState(false);
	const [isVisible, setIsVisible] = React.useState(false);

	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	const { login, error, loading } = useAuth();
	const submitHandler = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			await login(email, password);
			router.push("/admin/dashboard");
			setEmail("");
			setPassword("");
			toast.success("Login successful");
		} catch (error) {
			console.error("Login failed:", error?.message);
		} finally {
			setIsLoading(false);
		}
	}

	const { user } = useAuth();
	const router = useRouter();
	if (user && !loading) {
		router.push("/admin/dashboard"); // Redirect to login page if not logged in
		return null;
	}
	return (
		!loading && (
			<div className='min-h-dvh flex items-center justify-center bg-white dark:bg-gray-900'>

				<Suspense fallback={<Loading />}>
					<AdminSignin isLoading={isLoading} isVisible={isVisible} setIsVisible={setIsVisible} email={email} setEmail={setEmail} password={password} setPassword={setPassword} submitHandler={submitHandler} />
				</Suspense>
			</div>
		)
	);
}
