"use client"
import React, { useEffect } from 'react';
import AdminLayout from '@/app/_layouts/AdminLayout';
import { CategoryIcon, CheckCircleIcon, EditIcon, ResetIcon, ToggleIcon, UploadIcon } from '@/components/icons';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Input } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select';
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from '@/app/firebase/firebase';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import toast from 'react-hot-toast';
import { Snippet } from '@nextui-org/snippet';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/protected/ProtectedRoute';


const currentStatusOptions = [
	{ name: "Active", uid: "active" },
	{ name: "Paused", uid: "paused" },
];


const EditPage = ({ params }) => {
	const [categoryName, setCategorysName] = React.useState("");
	const [currentStatus, setCurrentStatus] = React.useState(currentStatusOptions[0].uid);
	const [isLoading, setIsLoading] = React.useState(false);
	const [imgUploading, setImgUploading] = React.useState(false);
	const [initialImageUrl, setInitialImageUrl] = React.useState(null);
	const [selectedFile, setSelectedFile] = React.useState(null);
	const inputFileRef = React.useRef(null);
	const router = useRouter();

	const fetchDataFromDB = async () => {
		try {
			const usersCollection = collection(db, "category");
			const userDocRef = doc(usersCollection, params.editId);
			const userDocSnap = await getDoc(userDocRef);
			const userStatus = userDocSnap.data();
			setCategorysName(userStatus?.categoryName);
			setCurrentStatus(userStatus?.status);
			setInitialImageUrl(userStatus?.image);
		} catch (error) {
			console.log("error", error);
		} finally {
		}
	}

	useEffect(() => {
		fetchDataFromDB()
	}, [params])


	const submitHandler = async (e, downloadURL) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const categoriesCollection = collection(db, "category");
			const categoriesDocRef = doc(categoriesCollection, params.editId);
			const body = {
				categoryName: categoryName,
				status: currentStatus,
				...(downloadURL ? { image: downloadURL } : {}),
			}

            // Extract image URL from document data
            const docSnapshot = await getDoc(categoriesDocRef);
            const imageURL = docSnapshot.data().image; // Replace 'imageURL' with actual field name
            const imageRef = ref(storage, imageURL); // Create a reference to the image

            await deleteObject(imageRef)

			await updateDoc(categoriesDocRef, body);
			router.back()
			toast.success(`Category Updated with ID: ${params?.editId}`);
			setIsLoading(false);
		} catch (error) {
			console.log(error?.message);
			setIsLoading(false);
		}
	}

	const handleFileChange = (event) => {
		const file = event.target.files[0];

		// Check if the file is an image
		if (file.type.startsWith("image/")) {
			setSelectedFile(file);
		} else {
			toast.error("Please select an image file.");
		}
	};

	const uploadFile = async (e, file) => {
		e.preventDefault();
		setImgUploading(true);
		setIsLoading(true);
		try {
			// Generate a unique filename based on current timestamp and original extension
			const timestamp = Date.now();
			const originalFilename = file.name;
			const extension = originalFilename.split('.').pop();
			const newFilename = `${timestamp}.${extension}`;

			const imagesRef = ref(storage, `/media/category/${newFilename}`);
			await uploadBytes(imagesRef, file).then((snapshot) => {
				getDownloadURL(snapshot.ref)
					.then((downloadURL) => {
						submitHandler(e, downloadURL);
					})

			});
			// toast.success('File uploaded successfully!');
			setImgUploading(false);
		} catch (error) {
			toast.error(error?.message);
			setIsLoading(false);
			// Handle errors appropriately (e.g., display error message to user)
		}
	};

	const handleUpload = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		// if (!selectedFile) {
		// 	toast.error('Please select a file to upload.');
		// 	setIsLoading(false);
		// 	return;
		// }

		if (selectedFile) {
			await uploadFile(e, selectedFile);
		} else {
			await submitHandler(e);

		}

		setSelectedFile(null); // Clear file selection after upload
	};


	return (
		<>
			<ProtectedRoute>
				<AdminLayout>
					<Card as={"form"} onSubmit={(e) => { handleUpload(e) }} className="w-full dark:bg-zinc-800 dark:text-white mx-auto has-[[aria-label=Loading]]:!pointer-events-none [&_label]:has-[[aria-label=Loading]]:!pointer-events-none">
						<CardHeader className="flex gap-3">
							<CategoryIcon className="size-6 text-primary dark:text-white" />
							<div className="flex flex-col">
								<p className="text-lg font-bold text-primary dark:text-white">Edit Category</p>
								<div className='flex items-center gap-1'>ID: <Snippet className='py-0' symbol=" ">{params?.editId}</Snippet></div>
							</div>
						</CardHeader>
						<Divider />
						<CardBody className="dark:bg-zinc-900/50 grid sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-3">
							<div className="mb-4">
								<Input
									label="Category Name"
									isRequired
									size="lg"
									variant="bordered"
									startContent={<EditIcon className="size-4" />}
									type="text"
									id="categoryName"
									value={categoryName}
									onValueChange={setCategorysName}
								/>
							</div>
							<div className="mb-4">
								<Select
									label="Select Current Status"
									disallowEmptySelection
									isRequired
									size="lg"
									variant="bordered"
									startContent={<ToggleIcon className="size-4" />}
									id="currentStatus"
									selectedKeys={[currentStatus]}
									onChange={(e) => { setCurrentStatus(e.target.value) }}
								>
									{currentStatusOptions ? currentStatusOptions?.map((item) => (
										<SelectItem className="capitalize font-semibold" key={item?.uid} value={item?.uid}>
											{item?.name}
										</SelectItem>
									)) : ''}
								</Select>
							</div>
							<div className="mb-4 sm:col-span-2">
								<div className="flex items-center justify-center w-full">
									<label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-zinc-300 border-dashed rounded-lg cursor-pointer bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:border-zinc-500 dark:hover:bg-zinc-600 bg-cover bg-center" style={selectedFile ? { backgroundImage: `url(${URL.createObjectURL(selectedFile)})` } : { backgroundImage: `url(${initialImageUrl})` }}>
										<div className={`flex flex-col items-center justify-center pt-5 pb-6 backdrop-blur-lg size-full group/opacity hover:opacity-100 ${(selectedFile || initialImageUrl) ? 'opacity-0 bg-zinc-900/50' : ''}`}>
											<UploadIcon className="size-6 text-zinc-500 group-[.opacity-0]/opacity:text-zinc-100 dark:text-zinc-400" />
											<p className="mb-2 text-sm text-zinc-500 group-[.opacity-0]/opacity:text-zinc-100 dark:text-zinc-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
											<p className="text-xs text-zinc-500 group-[.opacity-0]/opacity:text-zinc-100 dark:text-zinc-400">WEBP, AVIF, PNG, JPG or GIF (MAX. 800x400px)</p>
										</div>
										<input
											id="dropzone-file"
											name='file'
											type="file"
											className="hidden"
											onChange={handleFileChange}
											ref={inputFileRef}
											accept="image/*"
										/>
									</label>
								</div>
							</div>

						</CardBody>
						<Divider />
						<CardFooter>
							<div className="flex gap-4 items-center w-full">
								{
									!isLoading ?
										<Button type="submit" variant="solid" size="lg" className="!w-1/2 bg-purple-700 text-white font-semibold [&_svg]:has-[[aria-label=Loading]]:hidden [&_[aria-label=Loading]>*]:size-4" startContent={<CheckCircleIcon className="size-5" />}>
											Update
										</Button>
										:
										<Button type="button" variant="solid" isLoading size="lg" className="!w-1/2 bg-purple-700 text-white font-semibold [&_[aria-label=Loading]>*]:size-4">
											{!imgUploading ? "Saving..." : "Image Uploading..."}
										</Button>
								}
								<Button type="button" onClick={() => { router.back() }} size="lg" variant="bordered" className="!w-1/2 dark:border-zinc-200/30 font-semibold dark:text-white/70" startContent={<ResetIcon className="size-5" />}>
									Back
								</Button>
							</div>
						</CardFooter>
					</Card>
				</AdminLayout>
			</ProtectedRoute>
		</>
	)
}

export default EditPage