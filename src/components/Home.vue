<template>
  <div>
    <div class="comments">
      <div>
        <el-input type="text" placeholder="请输入内容" v-model="data.content"></el-input>
      </div>
      <el-button type="primary" size="mini" @click="submit()">留言</el-button>
    </div>

    <!-- 留言版主题区域 -->
    <div class="dispalyComments">
      <ul v-for="com1 in comments" :key="com1.id">
        <li>
          <span v-if="com1.isShow" @click="display(com1.id)">-</span>
          <span v-else @click="hide(com1.id)">+</span>
          {{ com1.id }} {{ com1.commentator }} ： {{ com1.content }} {{ com1.time }}
          <el-button size="mini" @click="dialogVisibleChange(com1.id)">回复</el-button>
          <el-button size="mini" @click="deleteComment(com1.id)">删除</el-button>

          <ul v-for="com2 in com1.children" :key="com2.id" v-show="com1.isShow">
            <li>{{ com2.id }} - {{ com2.commentator }} - {{ com2.content }} - {{ com2.time }}</li>
          </ul>
        </li>
      </ul>
    </div>

    <!-- 回复留言对话框 -->
    <el-dialog title="添加留言" :visible.sync="addCommmentdialogVisible" width="30%">
      <el-input v-model="addComment" placeholder="请输入回复"></el-input>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addComments()">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        id: "0",
        content: "",
        commentator: "",
        time: "",
        isShow: true
      },
      addCommmentdialogVisible: false,
      //cid是用来存回复的那个评论的id
      cid: "",
      addComment: "",
      comments: [
        {
          id: "1",
          commentator: "小明",
          content: "我觉得不行",
          time: "2021-07-10 16:05:10",
          isShow: true,
          children: [
            {
              id: "0",
              commentator: "小易",
              content: "我觉得OK",
              time: "2021-07-10 17:05:10",
            },
            {
              id: "1",
              commentator: "小易",
              content: "我觉得OK",
              time: "2021-07-10 17:05:10",
            },
            {
              id: "2",
              commentator: "小易",
              content: "我觉得OK",
              time: "2021-07-10 17:05:10",
            },
          ],
        },
        {
          id: "2",
          commentator: "小红",
          content: "我也觉得不行",
          time: "2021-07-10 16:05:10",
          isShow: true,
          children: [
            {
              id: "0",
              commentator: "小易",
              content: "我觉得OK",
              time: "2021-07-10 17:05:10",
            },
          ],
        },
        {
          id: "3",
          commentator: "小花",
          content: "我觉得行",
          time: "2021-07-10 16:05:10",
          isShow: true,
          children: [],
        },
        {
          id: "4",
          commentator: "小李",
          content: "我觉得还行",
          time: "2021-07-10 16:05:10",
          isShow: true,
          children: [],
        },
      ],
    };
  },
  created() {
    window.sessionStorage.setItem("userId", 1);
    window.sessionStorage.setItem("commentator", "小明");
  },
  methods: {
    //创建当前时间
    createTime() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    },
    submit() {
      this.data.time = this.createTime();
      this.data.commentator = window.sessionStorage.getItem("commentator");
      this.data.id = this.comments.length + 1;
      var obj = {
        id: this.data.id,
        commentator: this.data.commentator,
        content: this.data.content,
        time: this.createTime(),
        children: [],
      };
      if (this.data.id !== 0) {
        this.comments.push(obj);
        this.data.content = "";
      }
    },
    dialogVisibleChange(cid) {
      this.addCommmentdialogVisible = true;
      this.cid = cid;
    },
    searchIndex(id) {
      for (var i = this.comments.length - 1; i >= 0; i--) {
        if (id == this.comments[i].id) return i;
      }
    },
    addComments() {
      var index = this.searchIndex(this.cid);
      var obj = {
        id: this.comments[index].children.length,
        commentator: window.sessionStorage.getItem('commentator'),
        content: this.addComment,
        time: this.createTime(),
      };
      if (obj.content) {
        this.comments[index].children.push(obj);
        this.addCommmentdialogVisible = false;
        this.addComment = "";
      }
    },
    deleteComment(cid) {
      var index = this.searchIndex(cid);
      this.comments.splice(index, 1);
    },
    display(id) {
      var index = this.searchIndex(id)
      this.comments[index].isShow = false;
    },
    hide(id) {
      var index = this.searchIndex(id)
      this.comments[index].isShow = true;
    }
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}
.dispalyComments > ul > li {
  margin: 20px 0;
}
html,
body {
  background-color: #eee;
  width: 1500px;
  margin: 0 auto;
}
.comments .el-input {
  margin-bottom: 10px;
  width: 660px;
}
.dispalyComments {
  margin-top: 30px;
  background-color: #fff;
  padding: 20px 30px;
  width: 600px;
}
.dispalyComments ul li ul li {
  padding: 0 50px;
}
.dispalyComments ul li .reply {
  display: block;
}
</style>