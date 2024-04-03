import { useAuthStore } from "../stores/app";

const guestGuard = (to, from, next) => {
    const storeAuth = useAuthStore()

    if (storeAuth.isAuthenticated()) next('/')
    else next()

}

export default guestGuard;