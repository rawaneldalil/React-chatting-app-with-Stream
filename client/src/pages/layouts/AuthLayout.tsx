import { Outlet, useLocation } from "react-router-dom";
import { FullScreenCard } from "../../components/FullScreenCard";
import { Link } from "../../components/Link";

export function AuthLayout() {
    const location = useLocation();
    const isLogInPage = location.pathname === '/login';
    return (
        <FullScreenCard>
            <FullScreenCard.Body>
                <Outlet/>
            </FullScreenCard.Body>
            <FullScreenCard.BelowCard>
                <Link to={isLogInPage ? '/signup' : '/login'}>
                    {isLogInPage ? 'Create Account' : 'Login'}
                </Link>
            </FullScreenCard.BelowCard>
        </FullScreenCard>
    )  
}