import { useAuthStore } from "../stores/app";

const authGuard = (to, from, next) => {
    const auth = useAuthStore()

    if (!auth.isAuthenticated()) next({ name: 'Login' })
    else next()
    
}

export default authGuard;