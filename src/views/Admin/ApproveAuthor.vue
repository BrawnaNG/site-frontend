<template>
    <div 
        class="container-fluid my-2 p-2"
        v-if="!tokenSubmitted"
    >
        <div 
            v-if="user">
            <div class="row mt-3 justify-content-md-center">
                <p><label>Email: </label> {{ user.email }}</p>
                <p><label>Alias: </label> {{ user.alias }}</p>
                <p><label>Joined: </label> {{ moment(user.date_joined) }}</p>
            </div>
            <div class="row mt-3 justify-content-md-center">
                <div class="col-md-auto w-25">
                    <button
                        class="story-default-btn w-50 px-4 py-2 my-3 mx-auto"
                        @click="approveAuthor"
                    >
                        Approve as author
                    </button>
                </div>
                <div class="col-md-auto w-25">
                    <button
                        class="story-default-btn w-50 px-4 py-2 my-3 mx-auto"
                        @click="denyAuthor"
                    >
                        Deny as author
                    </button>
                </div>
            </div>
        </div>
        <div 
            class="p-1 alert alert-danger w-50 col-12 mx-auto rounded border text-center"
            v-if="approval.error">
            {{ approval.error }}
        </div>
    </div>
    <div 
        class="container-fluid my-2 p-2"
        v-if="tokenSubmitted"
    >
        <div class="row mt-4 justify-content-md-center">
            <div 
                class="p-1 alert alert-danger w-50 col-12 mx-auto rounded border text-center"
                v-if="approval.error">
                {{ approval.error }}
            </div>
            <div 
                class="p-1 alert alert-success w-50 col-12 mx-auto rounded border text-center"
                v-if="approval.success">
                {{ approval.success }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onBeforeMount, inject } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/services/api';
const moment = inject('moment');

const route = useRoute();
const approvalToken = ref(route.params.token);
const user_id = ref(route.params.user_id);

const approval = reactive({
  error: null,
  success: null
});

const user = ref(undefined);

const tokenSubmitted = ref(false);

// Lifecycle hooks
onBeforeMount(() => {
  getUser();
});

// Functions
function getUser() {
    api.get(`/accounts/get-user/${user_id.value}/`).then(
        (res) => {
            user.value = res.data;
        },
        (err) => {
            approval.error = err.response.data["detail"];
        }
    );
}

function approveAuthor(){
    api.post(`/accounts/approve-author/`, { token: approvalToken.value, is_approved: true }).then(
        (_) => {
            tokenSubmitted.value = true;
            approval.success = "Author status approved";
        },
        (err) => {
            approval.error = err.response.data["detail"];
        }
    );
}

function denyAuthor(){
    api.post(`/accounts/approve-author/`, { token: approvalToken.value, is_approved: false }).then(
        (_) => {
            tokenSubmitted.value = true;
            approval.success = "Author status denied";
        },
        (err) => {
            approval.error = err.response.data["detail"];
        }
    );
}

</script>