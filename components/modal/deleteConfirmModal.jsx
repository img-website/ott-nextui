import React from 'react'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { DeleteIcon, TrendingIcon } from '../icons';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Snippet } from '@nextui-org/snippet';

const DeleteConfirmModal = ({ deleteId, deleteName, willDeleteName, isOpen, onOpenChange, setWillDeleteName, confirmDeleteModal, deleting, labelName }) => {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            backdrop={"blur"}
            hideCloseButton={true}
            isKeyboardDismissDisabled={true}
            isDismissable={false}
            className='has-[[aria-label=Loading]]:!pointer-events-none [&_label]:has-[[aria-label=Loading]]:!pointer-events-none"'
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Delete this {labelName ? labelName : 'data'}?</ModalHeader>
                        <ModalBody>
                            <div>Confirm you want to delete this {labelName ? labelName : 'data'} by typing its Name: <Snippet className='py-0' symbol={''}>{deleteName}</Snippet></div>
                            <Input
                                autoFocus
                                endContent={
                                    <TrendingIcon className="size-5 text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                type='text'
                                label={`${labelName ? labelName : 'Data'} ID: ${deleteId}`}
                                placeholder={`Enter ${deleteName}`}
                                onValueChange={setWillDeleteName}
                                value={willDeleteName}
                                variant="bordered"
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={() => {
                                onClose();
                                setWillDeleteName('');
                            }}>
                                Cancel
                            </Button>
                            {!deleting ?
                                <Button color="danger" onPress={() => {
                                    confirmDeleteModal(deleteId, deleteName, onClose);
                                }} startContent={<DeleteIcon className="size-5" />}>
                                    Yes, Delete
                                </Button>
                                :
                                <Button color="danger" isLoading className='[&_[aria-label=Loading]>*]:size-4'>
                                    Deleting
                                </Button>
                            }
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default DeleteConfirmModal