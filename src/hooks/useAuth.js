import { useSelector } from "react-redux";
import { selectUser, selectIsRefreshing, selectIsLoggedIn } from 'redux/selectors';

export const useAuth = () => {
    return {
        isLoggedIn: useSelector(selectIsLoggedIn),
        isRefreshing: useSelector(selectIsRefreshing),
        user: useSelector(selectUser),
    }
}