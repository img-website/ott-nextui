"use client"
import React from 'react';
import AdminLayout from '@/app/_layouts/AdminLayout';
import { CategoryAddIcon, CheckCircleIcon, ResetIcon, TrendingIcon } from '@/components/icons';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Input } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select';
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from '@/app/firebase/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import toast from 'react-hot-toast';


const currentStatusOptions = [
	{ name: "Active", uid: "active" },
	{ name: "Paused", uid: "paused" },
];


const AddPage = () => {
	const [categoryName, setCategoryName] = React.useState("");
	const [currentStatus, setCurrentStatus] = React.useState(currentStatusOptions[0].uid);
	const [isLoading, setIsLoading] = React.useState(false);
	const [imgUploading, setImgUploading] = React.useState(false);
	const [selectedFile, setSelectedFile] = React.useState(null);
	const inputFileRef = React.useRef(null);

	const handleReset = () => {
		setCategoryName("");
		setCurrentStatus(currentStatusOptions[0].uid);
		setSelectedFile(null);
		if (inputFileRef.current) {
			inputFileRef.current.value = "";
		}
	};


	const submitHandler = async (e, downloadURL) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const docRef = await addDoc(collection(db, "category"), {
				categoryName: categoryName,
				status: currentStatus,
				image: downloadURL,
			});
			toast.success(`Category added with ID: ${docRef.id}`);
			handleReset();
			setIsLoading(false);
		} catch (error) {
			toast.error(error?.message);
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
			console.info(timestamp)
			const newFilename = `${timestamp}.${extension}`;
		
			const imagesRef = ref(storage, `/media/categories/${newFilename}`);
			await uploadBytes(imagesRef, file).then((snapshot) => {
				getDownloadURL(snapshot.ref)
					.then((downloadURL) => {
						submitHandler(e, downloadURL)
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
		if (!selectedFile) {
			toast.error('Please select a file to upload.');
			setIsLoading(false);
			return;
		}

		await uploadFile(e, selectedFile);
		setSelectedFile(null); // Clear file selection after upload
	};


	return (
		<AdminLayout>
			<Card as={"form"} onSubmit={(e) => { handleUpload(e) }} className="w-full dark:bg-zinc-800 dark:text-white mx-auto has-[[aria-label=Loading]]:!pointer-events-none [&_label]:has-[[aria-label=Loading]]:!pointer-events-none">
				<CardHeader className="flex gap-3">
					<CategoryAddIcon className="size-6 text-primary dark:text-white" />
					<div className="flex flex-col">
						<p className="text-lg font-bold text-primary dark:text-white">Add Category</p>
						<p className="text-sm">All Fields Are Mandatory</p>
					</div>
				</CardHeader>
				<Divider />
				<CardBody className="dark:bg-zinc-900/50 grid sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-3">
					<div className="mb-4">
						<Input
							label="Status Name"
							isRequired
							size="lg"
							variant="bordered"
							startContent={<CategoryAddIcon className="size-4" />}
							type="text"
							id="categoryName"
							value={categoryName}
							onValueChange={setCategoryName}
						/>
					</div>
					<div className="mb-4">
						<Select
							label="Select Current Status"
							isRequired
							size="lg"
							variant="bordered"
							startContent={<CheckCircleIcon className="size-4" />}
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
						<div className="group flex flex-col w-full cursor-pointer" data-slot="base" data-filled="true" data-filled-within="true" data-required="true" data-has-elements="true" data-has-label="true" data-has-value="true" data-invalid="true" data-has-helper="false">
							<div data-slot="input-wrapper" className="relative w-full inline-flex tap-highlight-transparent shadow-sm px-3 border-medium min-h-12 rounded-large flex-col items-start justify-center transition-background !duration-150 motion-reduce:transition-none h-16 py-2.5 gap-0 border-gray-400 data-[hover=true]:border-gray-300 group-data-[focus=true]:border-gray-200 cursor-pointer" style={{ cursor: 'text' }}>
								<label data-slot="label" className="absolute z-10 pointer-events-none origin-top-left rtl:origin-top-right subpixel-antialiased block text-foreground-500 after:content-['*'] after:text-danger after:ml-0.5 will-change-auto !duration-200 !ease-out motion-reduce:transition-none transition-[transform,color,left,opacity] group-data-[filled-within=true]:pointer-events-auto group-data-[filled-within=true]:scale-85 text-medium group-data-[filled-within=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_8px_-_theme(borderWidth.medium))] pe-2 max-w-full text-ellipsis overflow-hidden group-data-[filled-within=true]:text-gray-300 cursor-pointer" id="react-aria-:RdmkvfffacqH1:" htmlFor="image">
									Upload Category Image
								</label>
								<div data-slot="inner-wrapper" className="inline-flex w-full items-center h-full box-border group-data-[has-label=true]:items-end cursor-pointer">
									<svg fill="currentColor" height={40} viewBox="0 0 576 512" strokeWidth={0} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" className="size-4">
										<path d="M160 80H512c8.8 0 16 7.2 16 16V320c0 8.8-7.2 16-16 16H490.8L388.1 178.9c-4.4-6.8-12-10.9-20.1-10.9s-15.7 4.1-20.1 10.9l-52.2 79.8-12.4-16.9c-4.5-6.2-11.7-9.8-19.4-9.8s-14.8 3.6-19.4 9.8L175.6 336H160c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16zM96 96V320c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H160c-35.3 0-64 28.7-64 64zM48 120c0-13.3-10.7-24-24-24S0 106.7 0 120V344c0 75.1 60.9 136 136 136H456c13.3 0 24-10.7 24-24s-10.7-24-24-24H136c-48.6 0-88-39.4-88-88V120zm208 24a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z">
										</path>
									</svg>
									<input
										onChange={handleFileChange}
										ref={inputFileRef}
										data-slot="input"
										data-has-start-content="true"
										className="w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 text-gray-200 text-sm cursor-pointer file:mr-2 file:py-0 file:px-1 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 file:cursor-pointer"
										id="image"
										aria-label="Upload Category Image"
										type="file"
										required
										aria-required="true"
										aria-invalid="true"
										accept="image/*" // Add this attribute to accept only images
									/>

								</div>
							</div>
							<div data-slot="helper-wrapper" className="hidden group-data-[has-helper=true]:flex p-1 relative flex-col gap-1.5">
								<div data-slot="error-message" className="text-tiny text-danger" id="react-aria-:RdmkvfffacqH4:">Please select a file.</div>
							</div>
						</div>
					</div>

				</CardBody>
				<Divider />
				<CardFooter>
					<div className="flex gap-4 items-center w-full">
						{
							!isLoading ?
								<Button type="submit" variant="solid" size="lg" className="!w-1/2 bg-purple-700 text-white font-semibold [&_svg]:has-[[aria-label=Loading]]:hidden [&_[aria-label=Loading]>*]:size-4" startContent={<CheckCircleIcon className="size-5" />}>
									Add
								</Button>
								:
								<Button type="button" variant="solid" isLoading size="lg" className="!w-1/2 bg-purple-700 text-white font-semibold [&_[aria-label=Loading]>*]:size-4">
									{!imgUploading ? "Saving..." : "Image Uploading..."}
								</Button>
						}
						<Button type="button" onClick={handleReset} size="lg" variant="bordered" className="!w-1/2 dark:border-zinc-200/30 font-semibold dark:text-white/70" startContent={<ResetIcon className="size-5" />}>
							Reset
						</Button>
					</div>
				</CardFooter>
			</Card>
		</AdminLayout>
	)
}

export default AddPage