<template>
  <div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header text-center">LOGIN</div>
            <form action="/identifier" method="post">
              <div class="card-body">
                <div class="form-group row">
                  <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

                  <div class="col-md-6">
                    <input type="text" name="username" class="form-control" value="" required autocomplete="email"
                      v-model="login.username" autofocus />
                  </div>
                </div>

                <div class="form-group row">
                  <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                  <div class="col-md-6">
                    <input id="password" name="password" type="password" class="form-control" v-model="login.password" required
                      autocomplete="current-password" />

                    <span class="invalid-feedback" role="alert">
                      <strong>Invalid</strong>
                    </span>
                  </div>
                </div>

                <div class="form-group row">
                  <div class="col-md-6 offset-md-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" name="remember" id="remember" />

                      <label class="form-check-label" for="remember">
                        Remember me
                      </label>
                    </div>
                  </div>
                </div>

                <div class="form-group row mb-0">
                  <div class="col-md-8 offset-md-4">
                    <button class="btn btn-main">
                      Login
                    </button>

                    <NuxtLink class="btn btn-secondary" to="/register"> Register </NuxtLink>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async login() {
      try {
        let credentials = {
          username: this.login.username,
          password: this.login.password,
          grant_type: "password",
          client_id: this.$config.client_id,
          client_secret: this.$config.client_secret,
        };
        let response = await this.$auth.loginWith('local', { data: credentials })
        if (response.status == 200)
          this.$router.go()
        // 
        //document.querySelector('body').style.backgroundColor = 'rgb(233, 233, 233)'

      } catch (err) {
        $nuxt.$bvToast.toast('Please check username & password.', {
          title: 'Failed.!',
          variant: 'danger',
          solid: true,
        })
        //console.log(err)
      }
    }
  },
}
</script>

<style>
</style>
