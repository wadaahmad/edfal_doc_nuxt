<template>
  <div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header text-center">
              Registrasi untuk warga sekolah
            </div>
            <form @submit.prevent="register">
              <div class="card-body">
                <div class="form-group row">
                  <label class="col-md-4 col-form-label text-md-right">NIK</label>

                  <div class="col-md-6">
                    <input type="number" class="form-control" value="" required placeholder="NIK" v-model="rdata.nik"
                      autofocus />
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-md-4 col-form-label text-md-right">Nama Lengkap</label>

                  <div class="col-md-6">
                    <input type="text" placeholder="nama lengkap tanpa gelar" class="form-control" v-model="rdata.name"
                      required />

                    <span class="invalid-feedback" role="alert">
                      <strong>Invalid</strong>
                    </span>
                  </div>
                </div>

                <div class="form-group row mb-0">
                  <div class="col-md-8 offset-md-4">
                    <button class="btn btn-main">Register</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <b-modal v-model="rdata.showRegister" title="Registrasi user login" @ok="registerUser">
      <div class="alert alert-primary" v-if="unregisteredUser != undefined">
        Nama : {{ unregisteredUser.name }} <br />Sebagai : {{ unregisteredUser.type }}
      </div>
      Masukan email dan password yg akan digunakan untuk login.
      <form ref="form" class="content">
        <b-form-group label="Email">
          <b-form-input type="email" v-model="rdata.user.email" required></b-form-input>
        </b-form-group>
        <b-form-group label="Password">
          <b-form-input type="password" v-model="rdata.user.password"></b-form-input>
        </b-form-group>
        <b-form-group label="Tulis ulang password">
          <b-form-input type="password" v-model="rdata.user.repassword"></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
    <b-modal v-model="rdata.showRedirect" hide-footer hide-header>
      Selamat registrasi berhasil anda akan segera diredirect ke dashboard akun
      anda
      <div class="text-center m-5">
        <b-spinner type="grow" label="grow"></b-spinner>
        <b-spinner type="grow" label="Spinning"></b-spinner>
        <b-spinner type="grow" label="grow"></b-spinner>
        <b-spinner type="grow" label="Spinning"></b-spinner>
        <b-spinner type="grow" label="grow"></b-spinner>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { usePopup } from "~/repository/popup"
import { useRulesRepo } from "~/repository/rulesRepo"
import { useUserApi } from "../users/info/repository/userApi"

export default defineComponent({
  setup(props, ctx) {
    const rdata = reactive({
      nik: '',
      name: '',
      showRegister: false,
      showRedirect: false,
      user: {
        user_id: '',
        name: '',
        type: '',
        privilege_id: '',
        email: '',
        password: '',
        repassword: '',
      },
    })
    const userApi = useUserApi()
    const { schInfo } = useRulesRepo()
    const unregisteredUser = computed(() => userApi.unregisteredUser)
    async function register() {
      await userApi.getUnregisteredUser(rdata.nik, rdata.name)
      if (unregisteredUser.value == null) {
        usePopup(ctx).msgBoxOk("Data tidak ditemukan / Sudah terdaftar")
      } else {
        rdata.showRegister = true
      }
    }
    async function registerUser(bvModalEvt) {
      bvModalEvt.preventDefault()
      if (rdata.user.password == '' || rdata.user.repassword == '' || rdata.user.email == '')
        return usePopup(ctx).msgBoxOk("Mohon isi seluruh data")

      if (rdata.user.password != rdata.user.repassword) {
        usePopup(ctx).msgBoxOk("mohon tulis ulang kata sandi dengan benar", "Password tidak cocok.")

      } else {
        let method, url
        // if (this.user.id == '') {
        method = 'POST'
        url = 'users'
        // } else {
        //   method = 'PUT'
        //   url = 'users/' + this.id
        // }
        await userApi.store({
          id: '',
          user_id: rdata.user.user_id,
          name: unregisteredUser.value.name,
          email: rdata.user.email,
          school_id: schInfo.value.id,
          password: rdata.user.password,
          school_user_id: unregisteredUser.value.id,
          access_privilege_id: unregisteredUser.value.type_id,
        })
          .then((res) => {
            rdata.showRedirect = true
            rdata.showRegister = false
            try {
              setTimeout(() => {
                let credentials = {
                  username: rdata.user.email,
                  password: rdata.user.password,
                  grant_type: 'password',
                  client_id: this.$config.client_id,
                  client_secret: this.$config.client_secret,
                }
                this.$auth.loginWith('local', {
                  data: credentials,
                })
              }, 5000)
              //document.querySelector('body').style.backgroundColor = 'rgb(233, 233, 233)'
            } catch (err) {
              $nuxt.$bvToast.toast('Please check username & password.', {
                title: 'Failed.!',
                variant: 'danger',
                solid: true,
              })
              //console.log(err)
            }
          })
          .catch((error) => {
            if (error) {
              error.response.data.message.forEach((element) => {
                $nuxt.$bvToast.toast(element, {
                  title: 'Failed save',
                  variant: 'danger',
                  solid: true,
                })
              })
            }
          })
      }
    }
    return {
      rdata,
      unregisteredUser,
      register,
      registerUser
    }
  }
})
</script>

<style>
</style>
