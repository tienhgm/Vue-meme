<template>
    <div class="ass1-login">
        <div class="ass1-login__content">
            <p>Profile</p>

            <div class="ass1-login__form">
                <div class="avatar">
                    <img :src="getAvatar" alt="">
                </div>
                <form action="#" v-if="currentUser" v-on:submit.prevent="handleEditProfile">
                    <!-- Nếu dùng v-model thì sẽ lỗi vì không đc thay đổi trực tiếp state trong vuex -->
                    <input 
                        v-bind:value="currentUser.fullname" 
                        v-on:input="fullname = $event.target.value"
                        type="text" class="form-control" placeholder="Tên ..." required="">
                    
                    <select
                        v-bind:value="currentUser.gender"
                        v-on:change="gender = $event.target.value"  
                        class="form-control">
                        <option value="">Giới tính</option>
                        <option value="nam">Nam</option>
                        <option value="nữ">Nữ</option>
                    </select>
                    <input
                        v-on:change="uploadAvatar" 
                        type="file" name="avatar"  placeholder="Ảnh đại diện" class="form-control">
                    <textarea 
                        v-bind:value="currentUser.description"
                        v-on:input="description = $event.target.value"
                        class="form-control" cols="30" rows="5" placeholder="Mô tả ngắn ..."></textarea>

                    <div class="ass1-login__send justify-content-center">
                        <button type="submit" class="ass1-btn">Cập nhật</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'user-profile',
    data(){
        return {
            fullname: '',
            description: '',
            gender:'',
            avatar:{
                objectFile: null,
                base64URL: ''
            },
            userid: this.$route.params.id,
        }
    },
    watch: {
        $route(to,from){
            this.userid = to.params.id,
            this.checkIsCurrentUser()
        }
    },
    computed:{
        ...mapGetters(['currentUser']),
        getAvatar(){
            if(this.avatar.base64URL === '' && this.currentUser){
                return this.currentUser.profilepicture  
            } else {
                return this.avatar.base64URL
            }
        }
    }, 
    created(){
        // nguoi dung load lai trang
        this.checkIsCurrentUser()
    },
    methods:{
        ...mapActions(['updateProfile']),
        checkIsCurrentUser(){
            if(this.currentUser && this.userid){
                if(this.currentUser.USERID === this.userid) return true
                else return this.$router.push('/')
            }
        },
        // neu viet ham 
        // handleFullName(e){
        //     this.fullname = e.target.value
        // }
        handleEditProfile(){ 
            //Neu khong nhap thi lay gia tri cu
            if(!this.fullname) this.fullname = this.currentUser.fullname
            if(!this.description) this.description = this.currentUser.description
            if(!this.gender) this.gender = this.currentUser.gender

            if(this.fullname && this.description && this.gender){
                let data= {
                    fullname: this.fullname,
                    description: this.description,
                    gender: this.gender
                }
                if(this.avatar.objectFile){
                    data.objectFile = this.avatar.objectFile
                }    
                this.updateProfile(data).then(res => {
                    if(res.ok){
                        alert('Success')
                    } else {
                        alert(res.error)
                    }
                })
            }
        },
        uploadAvatar(e){
            if(e.target.files && e.target.files.length){
                const fileAvatar = e.target.files[0];

                //Hien thi avatar cho nguoi dung xem trc    
                let reader = new FileReader();

                reader.addEventListener("load",  () => {
                    // convert image file to base64 string
                    let previewSrc = reader.result;
                    this.avatar.base64URL = previewSrc;
                    this.avatar.objectFile = fileAvatar;
                    // console.log(previewSrc)
                }, false);

                if (fileAvatar) {
                    reader.readAsDataURL(fileAvatar);
                }
            }
        }
    }
}
</script>

<style>

</style>