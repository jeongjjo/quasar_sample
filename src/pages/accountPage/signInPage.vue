<template>
  <q-layout class="row items-center justify-evenly">
    <q-card class="my-card">
      <q-card-section>
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
        >
          <q-input
            filled
            v-model="id"
            label="Your Id *"
          />

          <q-input
            filled
            type="password"
            v-model="password"
            label="Your Password *"
          />

          <div>
            <q-btn label="Submit" type="submit" color="primary"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-layout>
</template>

<script>
import { useQuasar } from 'quasar'
import { useAuthStore } from 'stores/auth';
import { useRouter } from 'vue-router'
import { ref } from 'vue'

export default {
  setup () {
    const $q = useQuasar()
    const router = useRouter()
    const authStore = useAuthStore()
    const id = ref(null)
    const password = ref(null)
    return {
      id,
      password,
      onSubmit () {
        authStore.setUser({id: id.value, role: []})
        router.push('/');
      },
    }
  }
}
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>