"use client"

import {AuthContextProps} from "../auth/Auth.tsx";
import {useAuth} from "../auth/useAuth.ts";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {RiUser3Line, RiUserSettingsLine} from "react-icons/ri";
import {Avatar, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
export function NavUser() {

    const { isMobile } = useSidebar()
    const { t } = useTranslation();
    const auth: AuthContextProps = useAuth();

    // todo
    const avatarUrl = undefined;

    const handleLogoutClick = () => {
        auth.signoutRedirect()
            .catch((e) => console.log(e.message));
    }

    return (
        <>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar alt={auth.displayName} src={avatarUrl} />
                    </ListItemAvatar>
                    <ListItemText primary={auth.displayName} secondary={auth.mailAddress} />
                </ListItem>
            </List>

        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={avatarUrl} alt={auth.displayName} />
                                <AvatarFallback className="rounded-lg"><RiUser3Line /></AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{auth.displayName}</span>
                                <span className="truncate text-xs">{auth.mailAddress}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={avatarUrl} alt={auth.displayName} />
                                    <AvatarFallback className="rounded-lg"><RiUser3Line /></AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{auth.displayName}</span>
                                    <span className="truncate text-xs">{auth.mailAddress}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <Link to="my-account"><RiUserSettingsLine /> {t('my-account')}</Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogoutClick}>
                            <LogOut /> {t('logout')}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
            </>
    )
}