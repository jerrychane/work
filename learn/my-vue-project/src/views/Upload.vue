<template>
  <div>
    <label for="upload" class="choose-img">选择图片上传</label>
    <input type="file"   multiple id="upload"  style="display:none;"  accept="image/*" @change="onChange" ref="file">
    <p class="tip">提示:一次可选择多张图片,最多不超过9张(单张图片大小&lt;1M)</p>
  </div>
</template>

<script>
export default {
  methods: {
    onChange () {
      // const inputDOM = this.$refs.file
      // 可选链
      const newFiles = this.$refs?.file?.files
      // 校验
      if (newFiles.length > 9) {
        alert('最多可以一次选择9张图片')
        return false
      }
      const files = []
      for (const file of newFiles) {
        const size = file.size / 1024 / 1024 // 把单位转化为M
        if (size > 1) {
          alert('请选择1M以内的图片')
          return false
        }
        files.push(file)
      }
      this.uploadFilesByOss(files)
    },
    // 上传多图到阿里云OSS
    uploadFilesByOss (files) {
      return '111'
    }
  }
}
</script>

<style scoped>
div {
  display: flex;
  justify-content: center;
}
.choose-img {
  display: block;
  width: 150px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  background-color: #42b983;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
   margin-right: 10px;
}
.tips {
  color: #ccc;
}
</style>
