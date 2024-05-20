import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import React from 'react'
import { LogoutIcon } from '../icons';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthenticationContext';

const LogoutConfirmModal = ({ isOpen, onOpenChange }) => {
    const router = useRouter();
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        router.push("/admin");
    };
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
                        <ModalHeader className="flex items-center gap-1"><LogoutIcon className="size-5" /> Logout?</ModalHeader>
                        <ModalBody>
                            <div>Are you sure you want to logout?</div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={() => {
                                onClose();
                            }}>
                                No, Cancel
                            </Button>
                            <Button color="danger" onClick={handleLogout} startContent={<LogoutIcon className="size-5" />}>
                                Yes, Logout
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default LogoutConfirmModal