// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { AuthData, URL_API, UserData } from '../lib/definitions'
import { useRouter } from 'vue-router'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {

  const router = useRouter()
  const userData = ref<UserData | null>()
  const userToken = ref<String | null>(null)

  const setAuth = (data: AuthData): void => {
    const { user, token } = data
    setUserData(user)
    setToken(token)

    router.push('/')
  }

  const getToken = () => {
    return userToken.value;
  }
  const getUserData = () => {
    return userData.value
  }

  const setToken = (token: String | null) => {
    userToken.value = token
  }
  const setUserData = (user: UserData | null) => {
    userData.value = user;
  }

  const isAuthenticated = (): Boolean => !!userToken.value

  const $resetAuth = async () => {

    await axios
      .get(`${URL_API}/api/logout`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      .then((response) => {
        const { status } = response
        if (status === 200) {
          setToken(null)
          setUserData(null)
          router.push('/login')
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  return {
    setAuth,
    isAuthenticated,
    getToken,
    getUserData,
    $resetAuth
  }

})

export const useAppStore = defineStore('app', () => {

  const isLoading = ref(false)

  const setLoading = () => isLoading.value = !isLoading.value

  return {
    isLoading,
    setLoading
  }
})
