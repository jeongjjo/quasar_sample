import { defineStore } from 'pinia';
import { SessionStorage } from 'quasar';
import { Router as router } from '../router/index';
interface User {
  id: string;
  roles: string[];
}
export const useAuthStore = defineStore('auth', {
  state: (): User => ({
    id: '',
    roles: [],
  }),

  getters: {
    getUserId(state) {
      return state.id;
    },
    getUserRoles(state) {
      return state.roles;
    },
  },

  actions: {
    setAccessToken(accessToken: string) {
      SessionStorage.set('accessToken', accessToken);
    },
    setUser(user: User) {
      SessionStorage.set('user', user);
      this.id = user.id;
      this.roles = user.roles;
    },
    setSignOut() {
      console.log('actionSignOut')
      this.id = '';
      this.roles = [];
      SessionStorage.remove('accessToken');
      SessionStorage.remove('user');
      SessionStorage.clear();

      router.push('/signIn');
    },
  },
});
