"use client"
import React from 'react'
import { ChevronDownIcon, DeleteIcon, EditIcon, PlusIcon, SearchIcon, TrendingIcon, VerticalDotsIcon } from '@/components/icons';
import { Button } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { Input } from '@nextui-org/input';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import { Pagination } from '@nextui-org/pagination';
import { User } from '@nextui-org/user';
import { Chip } from '@nextui-org/chip';
import Link from 'next/link';
import { Snippet } from '@nextui-org/snippet';
import toast from 'react-hot-toast';
import { collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '@/app/firebase/firebase';
import DeleteConfirmModal from './modal/deleteConfirmModal';
import { useDisclosure } from '@nextui-org/modal';
import { deleteObject, ref } from 'firebase/storage';

const columns = [
    { name: "CATEGORY ID", uid: "id", sortable: true },
    { name: "CATEGORY NAME", uid: "categoryName", sortable: true },
    { name: "STATUS", uid: "status", sortable: true },
    { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
    { name: "Active", uid: "active" },
    { name: "Paused", uid: "paused" },
];

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const statusColorMap = {
    active: "success",
    paused: "danger",
};

const INITIAL_VISIBLE_COLUMNS = ["categoryName", "status", "actions"];

export default function AdminAllCategoryTable({ allCategories, fetchAllCategories }) {
    const [users, setUsers] = React.useState([]);
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: "id",
        direction: "ascending",
    });
    const [page, setPage] = React.useState(1);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [deleteId, setDeleteId] = React.useState("");
    const [deleteName, setDeleteName] = React.useState("");
    const [willDeleteName, setWillDeleteName] = React.useState("");
    const [deleting, setDeleting] = React.useState(false);


    const statusChangeHandler = async (id, statusToggle) => {
        try {
            const categoryCollection = collection(db, "category");
            const categoryDocRef = doc(categoryCollection, id);
            const body = {
                status: statusToggle,
            }
            await updateDoc(categoryDocRef, body);
            toast.success(`Status ${statusToggle == 'active' ? 'Active' : 'Paused'} with ID: ${id}`);
            fetchAllCategories();
        } catch (error) {
            toast.error(error?.message);
        }
    }

    const confirmDeleteModal = async (id, categoryName, onClose) => {
        if (deleteName === willDeleteName) {
            setDeleting(true);
            await categoryDeleteHandler(id, categoryName)
            onClose()
        } else {
            setWillDeleteName('');
            setDeleting(false);
            toast.error('Please confirm the deletion by type in the input field');
        }
    }



    const categoryDeleteHandler = async (id, categoryName) => {
        try {
            const categoryCollection = collection(db, "category");
            const categoryDocRef = doc(categoryCollection, id);
            
            // Extract image URL from document data
            const docSnapshot = await getDoc(categoryDocRef);
            const imageURL = docSnapshot.data().image; // Replace 'imageURL' with actual field name
            const imageRef = ref(storage, imageURL); // Create a reference to the image

            await deleteObject(imageRef)
            await deleteDoc(categoryDocRef);
            toast.success(`Category "${categoryName}" deleted with ID: ${id}`);
            fetchAllCategories();
            setWillDeleteName('');
            setDeleting(false);
        } catch (error) {
            toast.error(error?.message);
            setDeleting(false);
        }
    }


    React.useEffect(() => {
        setUsers(allCategories);
    }, [allCategories]);


    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column?.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...users];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers?.filter((user) =>
                user?.categoryName?.toLowerCase().includes(filterValue.toLowerCase()) || user?.id?.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredUsers = filteredUsers?.filter((user) =>
                Array.from(statusFilter).includes(user?.status),
            );
        }

        return filteredUsers;
    }, [users, filterValue, statusFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "id":
                return (
                    <Snippet symbol=" " size="sm">{user?.id}</Snippet>
                );
            case "categoryName":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: user?.image }}
                        name={cellValue}
                    >
                        {user?.categoryName}
                    </User>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[user?.status]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown aria-label="User Actions Menu">
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light" color='primary'>
                                    <VerticalDotsIcon />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                {/* <DropdownItem><Link href="" className='flex items-center gap-1 w-full'><ViewIcon className="size-4" />View</Link></DropdownItem> */}
                                <DropdownItem><Link href={`/admin/categories/edit/${user?.id}`} className='flex items-center gap-1 w-full'><EditIcon className="size-4" />Edit</Link></DropdownItem>
                                <DropdownItem onClick={() => { statusChangeHandler(user?.id, user?.status === "active" ? "paused" : "active") }}><div className='flex items-center gap-1 w-full'><TrendingIcon className="size-4" />{user?.status === "active" ? "Set Paused" : "Set Active"}</div></DropdownItem>
                                <DropdownItem onPress={() => {
                                    onOpen()
                                    setDeleteId(user?.id)
                                    setDeleteName(user?.categoryName)
                                }} className='hover:!bg-red-700/10 hover:!text-red-500'><Link href="" className='flex items-center gap-1 w-full'><DeleteIcon className="size-4" />Delete</Link></DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = React.useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("")
        setPage(1)
    }, [])

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Search by category name..."
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    Status
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Status"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}
                            >
                                {statusOptions.map((status) => (
                                    <DropdownItem key={status?.uid} className="capitalize">
                                        {capitalize(status?.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    Columns
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column?.uid} className="capitalize">
                                        {capitalize(column?.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Button as={Link} href='/admin/categories/add' color="primary" endContent={<PlusIcon />}>
                            Add New
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {users?.length} categories</span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            value={rowsPerPage}
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onRowsPerPageChange,
        users?.length,
        onSearchChange,
        hasSearchFilter,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <span className="w-[30%] text-small text-default-400">
                    {selectedKeys === "all"
                        ? "All items selected"
                        : `${selectedKeys.size} of ${filteredItems.length} selected`}
                </span>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        Previous
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        Next
                    </Button>
                </div>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    return (
        <>
            <Table
                aria-label="Example table with custom cells, pagination and sorting"
                isHeaderSticky
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                // classNames={{
                //     wrapper: "max-h-[382px]",
                // }}
                selectedKeys={selectedKeys}
                selectionMode="multiple"
                sortDescriptor={sortDescriptor}
                topContent={topContent}
                topContentPlacement="outside"
                onSelectionChange={setSelectedKeys}
                onSortChange={setSortDescriptor}
            >
                <TableHeader columns={headerColumns}>
                    {(column) => (
                        <TableColumn
                            key={column?.uid}
                            align={column?.uid === "actions" ? "center" : "start"}
                            allowsSorting={column?.sortable}
                        >
                            {column?.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={"No categories found"} items={sortedItems}>
                    {(item) => (
                        <TableRow key={item?.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <DeleteConfirmModal deleteId={deleteId} deleteName={deleteName} willDeleteName={willDeleteName} isOpen={isOpen} onOpenChange={onOpenChange} setWillDeleteName={setWillDeleteName} confirmDeleteModal={confirmDeleteModal} deleting={deleting} labelName={"Category"} />
        </>
    );
}

