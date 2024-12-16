import {BrowserRouter, Route, Routes} from "react-router-dom";
import TitleHeader from "./TitleHeader.tsx";
import {AuthContextProps, Role} from "./auth/Auth.tsx";
import DashboardView from "./pages/dashboard/DashboardView.tsx";
import {ProtectedRoute} from "./auth/ProtectedRoute.tsx";
import AccountsView from "./pages/adminAccounts/AccountsView.tsx";
import AdminRepositoriesView from "./pages/adminRepositories/AdminRepositoriesView.tsx";
import LicenseIssuesView from "./pages/licenseIssues/LicenseIssuesView.tsx";
import VulnerabilitiesView from "./pages/vulnerabilities/VulnerabilitiesView.tsx";
import AdminLicensesView from "./pages/adminLicenses/AdminLicensesView.tsx";
import SignInView from "./pages/signin/SignInView.tsx";
import {useAuth} from "./auth/useAuth.ts";
import AboutView from "./pages/commons/AboutView.tsx";
import MyAccountView from "./pages/myAccount/MyAccountView.tsx";
import ChangePasswortView from "./pages/signin/ChangePasswortView.tsx";
import ResetPasswortView from "./pages/signin/ResetPasswortView.tsx";
import CredentialsView from "./pages/credentials/CredentialsView.tsx";
import AdminConfigurationView from "./pages/adminConfiguration/AdminConfigurationView.tsx";
import ComponentsView from "./pages/components/ComponentsView.tsx";
import {ToastContainer} from "react-toastify";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "./components/ui/sidebar.tsx";
import {AppSidebar} from "./sidebar/AppSidebar.tsx";
import {Separator} from "./components/ui/separator.tsx";
import {ThemeProvider} from "./components/theme-provider.tsx";

function App() {
    const auth: AuthContextProps = useAuth();

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <BrowserRouter>
                {!auth.isAuthenticated &&
                    <Routes>
                        <Route path='reset-password' element={<ResetPasswortView/>}/>
                        <Route path='*' element={<SignInView/>}/>
                    </Routes>
                }
                {auth.isAuthenticated &&
                    <SidebarProvider>
                        <ToastContainer/>
                        <AppSidebar/>
                        <SidebarInset>
                            <header
                                className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                                <div className="flex items-center gap-2 px-4">
                                    <SidebarTrigger className="-ml-1"/>
                                    <Separator orientation="vertical" className="mr-2 h-4"/>
                                    <TitleHeader/>
                                </div>
                            </header>

                            <div style={{display: 'flex', height: '100vh',}}>
                                <div style={{ overflow: 'auto', flexGrow: 1 }}>
                                    <Routes>
                                        <Route path='components'
                                               element={<ProtectedRoute><ComponentsView/></ProtectedRoute>}/>
                                        <Route path='license-issues'
                                               element={<ProtectedRoute><LicenseIssuesView/></ProtectedRoute>}/>
                                        <Route path='vulnerabilities'
                                               element={<ProtectedRoute><VulnerabilitiesView/></ProtectedRoute>}/>

                                        <Route path='admin-licenses'
                                               element={<ProtectedRoute
                                                   roles={[Role.LICENSE_NAME_MAP_READ, Role.LICENSE_PURL_MAP_READ]}><AdminLicensesView/></ProtectedRoute>}/>
                                        <Route path='admin-vulnerabilities'
                                               element={<ProtectedRoute><VulnerabilitiesView/></ProtectedRoute>}/>
                                        <Route path='admin-repositories'
                                               element={<ProtectedRoute
                                                   roles={Role.REPOSITORY_READ}><AdminRepositoriesView/></ProtectedRoute>}/>
                                        <Route path='admin-accounts'
                                               element={<ProtectedRoute
                                                   roles={[Role.USERACCOUNT_READ, Role.USERACCOUNT_GROUP_READ]}><AccountsView/></ProtectedRoute>}/>
                                        <Route path='admin-credentials'
                                               element={<ProtectedRoute
                                                   roles={Role.CREDENTIAL_READ}><CredentialsView/></ProtectedRoute>}/>
                                        <Route path='admin-configuration'
                                               element={<ProtectedRoute
                                                   roles={Role.CONFIGURATION_READ}><AdminConfigurationView/></ProtectedRoute>}/>

                                        <Route path='my-account'
                                               element={<MyAccountView/>}/>
                                        <Route path='change-password'
                                               element={<ProtectedRoute><ChangePasswortView/></ProtectedRoute>}/>

                                        <Route path='about'
                                               element={<AboutView/>}/>

                                        {/* Default/Fallback routes */}
                                        <Route index element={<DashboardView/>}/>
                                        <Route path='*' element={<DashboardView/>}/>
                                    </Routes>
                                </div>
                            </div>

                        </SidebarInset>
                    </SidebarProvider>
                }
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
