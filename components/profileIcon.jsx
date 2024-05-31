import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown'
import { User } from '@nextui-org/user'
import React from 'react'
import { LogoutIcon } from './icons'

const ProfileIcon = ({ credential, LogoutHandler }) => {
    return (
        <Dropdown placement="bottom-start">
            <DropdownTrigger>
                <User
                    as="button"
                    avatarProps={{
                        isBordered: true,
                        src: credential?.photoURL,
                        size: "sm"
                    }}
                    className="transition-transform"
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-bold">Signed in as</p>
                    <p className="font-bold">{credential?.displayName}</p>
                </DropdownItem>
                <DropdownItem onClick={LogoutHandler} key="logout" color="danger" startContent={<LogoutIcon className="size-5" />}>
                    Log Out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

export default ProfileIcon