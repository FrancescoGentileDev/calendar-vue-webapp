<template>
  <section class="bg-white">
    <div
      class="container flex items-center justify-center min-h-screen px-6 mx-auto"
    >
      <form class="w-full max-w-md">
        <div class="flex items-center justify-center mt-6">
          <router-link
            to="/login"
            class="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500"
          >
            sign in
          </router-link>

          <router-link
            to="/register"
            class="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b"
          >
            sign up
          </router-link>
        </div>

        <div class="relative flex items-center mt-8">
          <span class="absolute">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 mx-3 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </span>

          <input
            type="text"
            class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 :border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Username"
            autocomplete="username"
          />
        </div>

        <div class="relative flex items-center mt-4">
          <span class="absolute">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 mx-3 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </span>

          <input
            type="password"
            class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 :border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Password"
            autocomplete="current-password"
          />
        </div>

        <div class="mt-6">
          <button
            class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          >
            Sign Up
          </button>

          <div class="mt-6 text-center">
            <router-link
              to="/register"
              class="text-sm text-blue-500 hover:underline"
            >
              Don't have an account?
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style></style>
