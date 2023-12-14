
<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="bg-primary text-white">
        <q-btn flat round dense icon="menu" class="q-mr-sm" @click="toggleLeftDrawer"/>
        <q-separator dark vertical inset />
          <q-btn stretch flat label="Admin Template" />
        <q-space />
        <q-btn-dropdown stretch flat :label="authStore.getUserId">
          <q-list>
            <q-item-section avatar>
              <q-btn stretch flat label="Sign Out" @click="authStore.setSignOut"/>
            </q-item-section>
          </q-list>
        </q-btn-dropdown>
        <q-separator dark vertical />
      </q-toolbar>      
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-list>
        <q-item to="/" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="dashboard"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/sampleTable" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="table_view"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>SampleTable</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/sampleModal" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="view_comfy_alt"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>SampleModal</q-item-label>
          </q-item-section>
        </q-item>
        <q-expansion-item
          icon="reorder"
          label="Tree"
        >
          <q-list class="q-pl-lg">
            <q-item to="#" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="list"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>tree-1</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="#" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="list"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>tree-2</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { useAuthStore } from 'stores/auth';
import { useRouter } from 'vue-router';
import router from 'src/router';

export default {
  setup () {
    const leftDrawerOpen = ref(false)
    const authStore = useAuthStore()
    const router = useRouter()
    // if(authStore.getUserId === ''){
    //   router.push('signIn')
    // }
    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      authStore
    }
  },
}
</script>
